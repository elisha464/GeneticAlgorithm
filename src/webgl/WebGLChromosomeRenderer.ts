import IChromosomeRenderer from "../interfaces/IChromosomeRenderer";
import Chromosome from "../Chromosome";
import CircleTextureBuilder from "./CircleTextureBuilder";

export default class WebGLChromosomeRenderer implements IChromosomeRenderer {
    private vsSource = `
    attribute vec4 aVertexPosition;
    attribute vec2 aTextureCoord;

    uniform vec2 uResolution;

    varying highp vec2 vTextureCoord;

    void main() {
        vec4 scaledPosition = aVertexPosition * vec4(1.0 / uResolution.x, 1.0 / uResolution.y, 1.0, 1.0);
        gl_Position = scaledPosition + vec4(-1.0, -1.0, 0.0, 0.0);
        vTextureCoord = aTextureCoord;
    }`;

    private fsSource = `
    varying highp vec2 vTextureCoord;

    uniform sampler2D uSampler;

    void main() {
        gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
        gl_FragColor.a = texture2D(uSampler, vTextureCoord).a;
    }`;

    private shaderProgram: WebGLProgram;
    private circleTexture: WebGLTexture;

    private programInfo: any;

    constructor(private renderingContext: WebGLRenderingContext) {
        this.setup();
    }

    private setup(): void {
        const gl = this.renderingContext;
        const vertexShader = this.loadShader(gl.VERTEX_SHADER, this.vsSource);
        const fragmentShader = this.loadShader(gl.FRAGMENT_SHADER, this.fsSource);

        this.shaderProgram = gl.createProgram();
        gl.attachShader(this.shaderProgram, vertexShader);
        gl.attachShader(this.shaderProgram, fragmentShader);
        gl.linkProgram(this.shaderProgram);

        if (!gl.getProgramParameter(this.shaderProgram, gl.LINK_STATUS)) {
            throw new Error('Unable to initialize the shader program: ' + gl.getProgramInfoLog(this.shaderProgram));
        }

        this.programInfo = {
            attribLocations: {
                vertexPosition: gl.getAttribLocation(this.shaderProgram, 'aVertexPosition'),
                textureCoord: gl.getAttribLocation(this.shaderProgram, 'aTextureCoord')
            },
            uniformLocations: {
                resolution: gl.getUniformLocation(this.shaderProgram, 'uResolution'),
                uSampler: gl.getUniformLocation(this.shaderProgram, 'uSampler')
            },
        };

        this.circleTexture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, this.circleTexture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, new CircleTextureBuilder().build(256));
        gl.generateMipmap(gl.TEXTURE_2D);
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

        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.viewport(0, 0, width, height);

        const positions = [
            0.0, 0.0,
            256.0, 0.0,
            0.0, 256.0,
            256.0, 256.0,
            256.0, 0.0,
            0.0, 256.0
        ];

        const texCoords = [
            0.0, 0.0,
            1.0, 0.0,
            0.0, 1.0,
            1.0, 1.0,
            1.0, 0.0,
            0.0, 1.0
        ];

        const positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
        gl.vertexAttribPointer(this.programInfo.attribLocations.vertexPosition, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(this.programInfo.attribLocations.vertexPosition);

        const texCoordBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(texCoords), gl.STATIC_DRAW);
        gl.vertexAttribPointer(this.programInfo.attribLocations.textureCoord, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(this.programInfo.attribLocations.textureCoord);

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this.circleTexture);

        gl.useProgram(this.shaderProgram);
        gl.uniform2fv(this.programInfo.uniformLocations.resolution, [width, height]);
        gl.uniform1i(this.programInfo.uniformLocations.uSampler, 0);

        gl.drawArrays(gl.TRIANGLES, 0, 6);
        
    }

    getImageData(width: number, height: number): ImageData {
        const buffer = new Uint8Array(width * height * 4);
        this.renderingContext.readPixels(0, 0, width, height, this.renderingContext.RGBA, this.renderingContext.UNSIGNED_BYTE, buffer);
        const result = new ImageData(Uint8ClampedArray.from(buffer), width, height);
        return result;
    }
}