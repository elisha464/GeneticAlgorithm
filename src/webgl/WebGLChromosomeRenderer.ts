import IChromosomeRenderer from "../interfaces/IChromosomeRenderer";
import Chromosome from "../Chromosome";
import CircleTextureBuilder from "./CircleTextureBuilder";
import Circle from "../Circle";

export default class WebGLChromosomeRenderer implements IChromosomeRenderer {
    private vsSource = `
    attribute vec4 aVertexPosition;
    attribute vec2 aTextureCoord;
    attribute vec4 aVertexColor;

    uniform vec2 uResolution;

    varying highp vec2 vTextureCoord;
    varying highp vec4 vVertexColor;

    void main() {
        vec4 scaledPosition = aVertexPosition * vec4(2.0 / uResolution.x, 2.0 / uResolution.y, 1.0, 1.0);
        gl_Position = scaledPosition + vec4(-1.0, -1.0, 0.0, 0.0);
        vTextureCoord = aTextureCoord;
        vVertexColor = aVertexColor;
    }`;

    private fsSource = `
    varying highp vec2 vTextureCoord;
    varying highp vec4 vVertexColor;

    uniform sampler2D uSampler;

    void main() {
        gl_FragColor = vVertexColor;
        gl_FragColor.a *= texture2D(uSampler, vTextureCoord).a;
    }`;

    private shaderProgram: WebGLProgram;
    private circleTexture: WebGLTexture;

    private positionBuffer: WebGLBuffer;
    private texCoordBuffer: WebGLBuffer;
    private vertColorBuffer: WebGLBuffer;

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
                textureCoord: gl.getAttribLocation(this.shaderProgram, 'aTextureCoord'),
                vertexColor: gl.getAttribLocation(this.shaderProgram, 'aVertexColor')
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
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);

        this.positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
        gl.vertexAttribPointer(this.programInfo.attribLocations.vertexPosition, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(this.programInfo.attribLocations.vertexPosition);

        this.texCoordBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.texCoordBuffer);
        gl.vertexAttribPointer(this.programInfo.attribLocations.textureCoord, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(this.programInfo.attribLocations.textureCoord);

        this.vertColorBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertColorBuffer);
        gl.vertexAttribPointer(this.programInfo.attribLocations.vertexColor, 4, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(this.programInfo.attribLocations.vertexColor);
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

        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.viewport(0, 0, width, height);


        const positionsFromCircle = (c: Circle): number[] => {
            const x = c.x * width;
            const y = c.y * height;
            const radius = c.radius * Math.min(width, height);
            return [
                x - radius, y - radius,
                x + radius, y - radius,
                x - radius, y + radius,
                x + radius, y + radius,
                x + radius, y - radius,
                x - radius, y + radius
            ];
        };

        const positions = chromosome.circles.reduce((a, b) => a.concat(positionsFromCircle(b)), []);

        const texCoords = chromosome.circles.reduce((a, b) => a.concat([
            0.0, 0.0,
            1.0, 0.0,
            0.0, 1.0,
            1.0, 1.0,
            1.0, 0.0,
            0.0, 1.0,
        ]), []);

        const vertColors = chromosome.circles.reduce((a, b) => a.concat([
            b.color.r/255, b.color.g/255, b.color.b/255, b.color.a,
            b.color.r/255, b.color.g/255, b.color.b/255, b.color.a,
            b.color.r/255, b.color.g/255, b.color.b/255, b.color.a,
            b.color.r/255, b.color.g/255, b.color.b/255, b.color.a,
            b.color.r/255, b.color.g/255, b.color.b/255, b.color.a,
            b.color.r/255, b.color.g/255, b.color.b/255, b.color.a,
        ]), []);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.texCoordBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(texCoords), gl.STATIC_DRAW);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertColorBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertColors), gl.STATIC_DRAW);

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this.circleTexture);

        gl.useProgram(this.shaderProgram);
        gl.uniform2fv(this.programInfo.uniformLocations.resolution, [width, height]);
        gl.uniform1i(this.programInfo.uniformLocations.uSampler, 0);

        gl.drawArrays(gl.TRIANGLES, 0, 6 * chromosome.circles.length);
        
    }

    getImageData(width: number, height: number): ImageData {
        const buffer = new Uint8Array(width * height * 4);
        this.renderingContext.readPixels(0, 0, width, height, this.renderingContext.RGBA, this.renderingContext.UNSIGNED_BYTE, buffer);
        const result = new ImageData(Uint8ClampedArray.from(buffer), width, height);
        return result;
    }
}