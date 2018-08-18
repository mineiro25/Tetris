const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');

context.scale(20,20); //escala

//matriz da peça T
const matrizT = [
	[0,0,0],
	[1,1,1],
	[0,1,0],
];

//matriz da peça O
const matrizO = [
	[0,0,0],
	[2,2,0],
	[2,2,0],
];

//matriz da peça S
const matrizS = [
	[0,0,0],
	[0,3,3],
	[3,3,0],
];

//matriz da peça O
const matrizZ = [
	[0,0,0],
	[4,4,0],
	[0,4,4],
];

//matriz da peça L
const matrizL = [
	[0,0,0,0,0],
	[0,0,0,0,0],
	[5,0,0,0,0],
	[5,0,0,0,0],
	[5,5,0,0,0]
];

//matriz da peça J
const matrizJ = [
	[0,0,0,0,0],
	[0,0,0,0,0],
	[0,6,0,0,0],
	[0,6,0,0,0],
	[6,6,0,0,0]
];

//matriz da peça I
const matrizI = [
	[0,0,0,0,0],
	[7,0,0,0,0],
	[7,0,0,0,0],
	[7,0,0,0,0],
	[7,0,0,0,0]
];

const arena = criaMatriz(12,20);

let valor; //valor aleatorio para gerar as pecas

const player = {
	pos: {x: 0, y: 0},
	matriz: null,
	score: 0,
}

//vai limpar a arena caso um linha esteja completa(horizontal)
function limpaArena(){
	let contaLinha =1;

	outer: for (var y = arena.length - 1; y > 0; y--) {
				for (var x = 0; x < arena[y].length; x++) {
					if (arena[y][x] === 0) {
						continue outer; //vai continuar o for dos y
					}
				}

				//vai substituir os valores da linha completa por 0
				const linha = arena.splice(y,1)[0].fill(0);
				//vai passar a linha limpa para topo da arena
				arena.unshift(linha);
				y++;

				player.score += contaLinha * 10;
				contaLinha *= 2; //cada vez que destroi uma linhas é a dobrar
			}
}

//ira verificar se a peca encontra um obstaculo
function colisao(arena, player){
	const [m, desvio]= [player.matriz, player.pos];

	for (let y = 0; y < m.length; ++y) {
		for (let x = 0; x < m[y].length; ++x) {
			if(m[y][x] !== 0 &&
				(arena[y + desvio.y] &&
					arena[y + desvio.y][x + desvio.x]) !== 0){
				
				return true;

			}
		}
	}
	return false;
}

//funcao que ira gerar novas pecas
function criaPecas(valor){

	switch (valor){
		case 0:
			return matrizT;
			break;
		
		case 1:
			return matrizI;
			break;
		
		case 2:
			return matrizJ;
			break;
		
		case 3:
			return matrizL;
			break;
		
		case 4:
			return matrizZ;
			break;
		
		case 5:
			return matrizS;
			break;
		
		case 6:
			return matrizO;
			break;

		default:
			break;
	}
}

function resetPlayer(){
	let valor = Math.floor(Math.random() * 7);
	player.matriz = criaPecas(valor);
	player.pos.y = 0;
	player.pos.x = (arena[0].length / 2 | 0) - (player.matriz[0].length / 2 | 0);

	//limpar a arena caso encha na vertical
	if(colisao(arena,player)){
		arena.forEach(linha => linha.fill(0));
		player.score=0;
		updateScore();
	}
}

//funcao que cria um array multidimensional para futuramente ser guardada as posicoes de cada peca
function criaMatriz(w, h){
	const matriz = [];
	while(h--){
		matriz.push(new Array(w).fill(0));
	}

	return matriz;
}


function desenha(){
	//preenche a peca com a cor #000 (preto)
	context.fillStyle = '#000'; 
	//cria uma rectangulo que vai dos pontos (0,0) ate as coordenadas defenidas em index.html
	context.fillRect(0, 0, canvas.width, canvas.height);

	desenhaMatriz(arena, {x:0, y:0});
	desenhaMatriz(player.matriz, player.pos);

}


//ira desenhar a peça  na tela
function desenhaMatriz(matriz, movimento){	
	matriz.forEach((linha, y) => {
		linha.forEach((valor, x) => {
			if(valor === 1){
				//atribuir uma cor a peca
				context.fillStyle = 'red';
				//desenha um rectangulo preenchido(por causa do fillStyle) 
				context.fillRect(x + movimento.x, 
								 y + movimento.y,
								 1,1); //x e y sao as coordenadas sup esq do retangulo, 1 é comp e larg da peca em pixeis
			} 
			else if(valor === 2){
				//atribuir uma cor a peca
				context.fillStyle = 'green';
				//desenha um rectangulo preenchido(por causa do fillStyle) 
				context.fillRect(x + movimento.x, 
								 y + movimento.y,
								 1,1); //x e y sao as coordenadas sup esq do retangulo, 1 é comp e larg da peca em pixeis
			}
			else if(valor === 3){
				//atribuir uma cor a peca
				context.fillStyle = 'purple';
				//desenha um rectangulo preenchido(por causa do fillStyle) 
				context.fillRect(x + movimento.x, 
								 y + movimento.y,
								 1,1); //x e y sao as coordenadas sup esq do retangulo, 1 é comp e larg da peca em pixeis
			}
			else if(valor === 4){
				//atribuir uma cor a peca
				context.fillStyle = 'yellow';
				//desenha um rectangulo preenchido(por causa do fillStyle) 
				context.fillRect(x + movimento.x, 
								 y + movimento.y,
								 1,1); //x e y sao as coordenadas sup esq do retangulo, 1 é comp e larg da peca em pixeis
			}
			else if(valor === 5){
				//atribuir uma cor a peca
				context.fillStyle = 'pink';
				//desenha um rectangulo preenchido(por causa do fillStyle) 
				context.fillRect(x + movimento.x, 
								 y + movimento.y,
								 1,1); //x e y sao as coordenadas sup esq do retangulo, 1 é comp e larg da peca em pixeis
			}
			else if(valor === 6){
				//atribuir uma cor a peca
				context.fillStyle = 'blue';
				//desenha um rectangulo preenchido(por causa do fillStyle) 
				context.fillRect(x + movimento.x, 
								 y + movimento.y,
								 1,1); //x e y sao as coordenadas sup esq do retangulo, 1 é comp e larg da peca em pixeis
			}
			else if(valor === 7){
				//atribuir uma cor a peca
				context.fillStyle = 'orange';
				//desenha um rectangulo preenchido(por causa do fillStyle) 
				context.fillRect(x + movimento.x, 
								 y + movimento.y,
								 1,1); //x e y sao as coordenadas sup esq do retangulo, 1 é comp e larg da peca em pixeis
			}
		});
	});
}

//funcao junta vai guardar a posicao das pecas num array multidimensional
function junta(arena, player){
	player.matriz.forEach((linha, y) => {
		linha.forEach((valor, x) => {
			if(valor !== 0){
				arena[y + player.pos.y][x + player.pos.x] = valor;
			}
		});
	});
}

//ta simplesmente encarregue da peca descer mais depressa ate colidir
function descidaplayer(){
		player.pos.y++;
		if(colisao(arena, player)){ //sempre que encontrar um obstaculo a peca reinicia no topo da tela
			player.pos.y--;
			junta(arena, player);
			resetPlayer();
			limpaArena();
			updateScore();
		}
		contadorDescida =0;
}

//movimento da peca
function movimentoPlayer(direcao){
	player.pos.x += direcao;
	if(colisao(arena, player)){
		player.pos.x -= direcao;

	}
}

//funcao que aplica a rotacao a matriz
function rotacaoPlayer(direcao){
	const pos = player.pos.x;
	let desvio = 1;
	rotacao(player.matriz, direcao);
	
	//impedir que a rode fora dos limites da tela
	while(colisao(arena,player)){
		player.pos.x += desvio;
		desvio = - (desvio + (desvio > 0 ? 1 : -1));

		if(desvio > player.matriz[0].length){
			rotacao(player.matriz, -direcao);
			player.pos.x = pos;
			return;
		}
	}
}

//rotacao das pecas = transposta da matriz + o inverso da matriz
function rotacao(matriz, direcao){
	for(let y =0; y<matriz.length; y++){
		for(let x = 0; x < y; x++){
			[
				matriz[x][y],
				matriz[y][x],
			]=[
				matriz[y][x],
				matriz[x][y],
			];
		}
	}

	if(direcao > 0){
		matriz.forEach(linha => linha.reverse());
	} else {
		matriz.reverse();
	}
}

let contadorDescida = 0;
let intervaloDescida = 1000;
let ultimoTempo =0;

function update(time = 0){
	const diferencaTempo = time - ultimoTempo;
	ultimoTempo = time;

	contadorDescida += diferencaTempo;
	if(contadorDescida > intervaloDescida){ //ira fazer com a peca desça a medida que o tempo passe
		descidaplayer();
	} 

	desenha();
	//diz ao browser que requer uma animacao e pede que o browser requira uma funcao para dar um update a animacao
	requestAnimationFrame(update);
}

//update do score
function updateScore(){
	document.getElementById('score').innerText ='Score: ' + player.score;
}

//print das instrucoes
function instrucoes(){
	document.getElementById('instrucoes').innerText = 'ArrowLeft: move a peça para a esquerda\nArrowUp: roda a peça no sentido dos ponteiros do relogio\nArrowRight: move a peça para a direita\nArrowDown: move a peça para baixo mais depressa';
}

//fazer as peças se mexerem atraves de certas teclas serem pressionadas
document.addEventListener('keydown', event => {
	switch(event.keyCode){
		
		case 37: //seta da esquerda ser pressionada
			movimentoPlayer(-1);
			break;
		
		case 39: //seta da direita ser pressionada
			movimentoPlayer(1);
			break;
		
		case 40: //seta de baixo ser pressionada
			descidaplayer();
			break;
		
		case 38: //seta de cima ser pressionada
			rotacaoPlayer(1);
			break;

		default: //qualquer outra tecla ser pressionada

			break;	
	}

});

resetPlayer();
updateScore();
instrucoes();
update();