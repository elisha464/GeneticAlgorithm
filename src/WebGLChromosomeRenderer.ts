import IChromosomeRenderer from "./interfaces/IChromosomeRenderer";
import Chromosome from "./Chromosome";

export default class WebGLChromosomeRenderer implements IChromosomeRenderer {
    private vsSource = `
    attribute vec4 aVertexPosition;
    uniform vec2 uResolution;

    void main() {
        vec4 scaledPosition = aVertexPosition * vec4(1.0 / uResolution.x, 1.0 / uResolution.y, 1.0, 1.0);
        gl_Position = scaledPosition + vec4(-1.0, -1.0, 0.0, 0.0);
    }`;

    private fsSource = `
    void main() {
      gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
    }`;

    private shaderProgram: WebGLProgram;

    private programInfo: any;

    constructor(private renderingContext: WebGLRenderingContext) {
        const vertexShader = this.loadShader(this.renderingContext.VERTEX_SHADER, this.vsSource);
        const fragmentShader = this.loadShader(this.renderingContext.FRAGMENT_SHADER, this.fsSource);

        this.shaderProgram = this.renderingContext.createProgram();
        this.renderingContext.attachShader(this.shaderProgram, vertexShader);
        this.renderingContext.attachShader(this.shaderProgram, fragmentShader);
        this.renderingContext.linkProgram(this.shaderProgram);

        if (!this.renderingContext.getProgramParameter(this.shaderProgram, this.renderingContext.LINK_STATUS)) {
            throw new Error('Unable to initialize the shader program: ' + this.renderingContext.getProgramInfoLog(this.shaderProgram));
        }

        this.programInfo = {
            attribLocations: {
                vertexPosition: this.renderingContext.getAttribLocation(this.shaderProgram, 'aVertexPosition')
            },
            uniformLocations: {
                resolution: this.renderingContext.getUniformLocation(this.shaderProgram, 'uResolution')
            },
        };
    }

    private loadShader(type: number, source: string): WebGLShader {
        const shader = this.renderingContext.createShader(type);
        this.renderingContext.shaderSource(shader, source);
        this.renderingContext.compileShader(shader);

        if (!this.renderingContext.getShaderParameter(shader, this.renderingContext.COMPILE_STATUS)) {
            const errorMessage = 'An error occurred compiling the shaders: ' + this.renderingContext.getShaderInfoLog(shader);
            this.renderingContext.deleteShader(shader);
            throw new Error(errorMessage);
        }
      
        return shader;
      }

    render(chromosome: Chromosome, width: number, height: number): void {
        const gl = this.renderingContext;
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.clearDepth(1.0);
        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LEQUAL);

        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.viewport(0, 0, width, height);

        const positions = [
            0.0, 0.0,
            100.0, 0.0,
            0.0, 100.0
        ];
        const positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

        gl.vertexAttribPointer(this.programInfo.attribLocations.vertexPosition, 2, gl.FLOAT, true, 0, 0);
        gl.enableVertexAttribArray(this.programInfo.attribLocations.vertexPosition);

        gl.useProgram(this.shaderProgram);
        gl.uniform2fv(this.programInfo.uniformLocations.resolution, [width, height]);

        gl.drawArrays(gl.TRIANGLES, 0, 3);
        
    }

    getImageData(width: number, height: number): ImageData {
        const buffer = new Uint8Array(width * height * 4);
        this.renderingContext.readPixels(0, 0, width, height, this.renderingContext.RGBA, this.renderingContext.UNSIGNED_BYTE, buffer);
        const result = new ImageData(Uint8ClampedArray.from(buffer), width, height);
        return result;
    }
}