<!-- Documentação do Projeto
Elden Ring
Este é um sistema web que permite aos usuários:

- Veja detalhes sobre o jogo de Elden Ring
- Pesquise sobre os Bosses e Itens do jogo
- Faça comentários de dicas e experiência sobre os Bosses

Estrutura dos Arquivos:

Arquivo	Função Principal
index.html	Página inicial com informações do jogo
boss.html	Página para buscar Bosses e comentar
itens.html	Página para buscar itens e armas
index.js	Script com lógica de busca (jogo, boss, item) e comentários
style.css	Estilo da página inicial
boss.css	Estilo visual da página de bosses
itens.css	Estilo visual da página de itens

Funcionalidades por Página
index.html – Página Inicial
Carrega dados do jogo Elden Ring da RAWG API
Exibe: nome, data de lançamento, nota, plataformas e imagem


boss.html – Pesquisa de Bosses
Permite ao usuário digitar o nome de um Boss e 
busca os dados em Fan API ou exibe conteúdo manual para:

cola dos bosses principais
Margit, Godrick, Rennala, Starscourge Radahn, Rykard, Godfrey, Morgott, Mohg, Malenia, e a Besta Elden. 

Exibe:

- Localização
- Descrição
- Estratégias, fraquezas e builds recomendadas

Permite adicionar:

Nome do usuário
Comentário
Nota (1 a 5 estrelas)

Salva comentários no localStorage com chave comentarios_NOME_DO_BOSS

itens.html – Busca de Itens/Armas
Permite buscar itens por nome

Caso não encontre, tenta buscar como arma

Exibe:

- Nome
- Categoria
- Descrição

Efeitos (para itens) ou escalamento e atributos requeridos (para armas)

Funcionalidades em index.js
Funções principais:
window.onload
→ Carrega dados do jogo automaticamente ao abrir o index.html

buscarBoss()
→ Mostra informações de bosses (manual ou via API)

buscarItem() e buscarComoArma()
→ Busca itens e armas pela Fan API

adicionarComentario()
→ Salva comentário no localStorage e atualiza interface

exibirComentarios(nomeBoss)
→ Carrega e exibe comentários salvos de um boss específico

Estilos (CSS)
Cada página tem seu próprio tema visual, porém compartilham um estilo consistente:

Navbar fixa com logo e links

Fonte estilizada (Georgia)

Cores temáticas em tons de amarelo, dourado e marrom

Background com imagem fixa inspirada em Elden Ring

Arquivos:
style.css: usado em index.html

boss.css: usado em boss.html

itens.css: usado em itens.html

Todos aplicam:

.navbar

.section

input, button

Cores e sombras compatíveis com o tema do jogo

Armazenamento Local
O sistema utiliza localStorage para:

Armazenar comentários por boss

Manter os dados disponíveis entre sessões

Exemplo de chave:
js
Copiar
Editar
localStorage.setItem("comentarios_Malenia, Espada de Miquella", [...])
Tecnologias Utilizadas
Tecnologia	Uso
HTML5	Estrutura das páginas
CSS3	Estilização customizada
JavaScript	Lógica de busca, comentários e renderização dinâmica
RAWG API	Obter dados do jogo Elden Ring
Elden Ring Fan API	Buscar bosses, itens e armas
LocalStorage	Persistência dos comentários
Bootstrap (CDN)	Layout responsivo na home (index.html)

Como Executar
Abra o arquivo index.html e seja feliz teste as funções de busca de boss

Interaja com o conteúdo: busque bosses, veja estratégias e avalie!

salamaleko -->
