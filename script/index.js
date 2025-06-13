// 🔁 Ao iniciar, carrega dados do Elden Ring da RAWG
window.onload = function () {
    const apiKey = '905631fcb5f14a74a217ccbbf7c8a0b9';
  
    console.log('Iniciando carregamento dos dados do Elden Ring');
  
    fetch(`https://api.rawg.io/api/games?key=${apiKey}&search=elden ring`)
      .then(res => {
        console.log('Resposta RAWG recebida:', res);
        if (!res.ok) throw new Error(`Status da resposta: ${res.status}`);
        return res.json();
      })
      .then(data => {
        console.log('Dados RAWG recebidos:', data);
        if (!data.results || data.results.length === 0) throw new Error('Nenhum resultado para Elden Ring');
  
        const jogo = data.results[0];
        const div = document.getElementById('infoJogo');
        const descricaoPadrao = `Elden Ring é um jogo de RPG de ação e fantasia ambientado em um mundo vasto e interconectado, onde os jogadores controlam um personagem personalizável que busca se tornar um Lorde Elden. A história gira em torno do Anel Elden, um objeto de grande poder que foi quebrado, dando início a uma era de caos. Os jogadores embarcam em uma jornada para restaurar a ordem e se tornar o novo Lorde Elden, enfrentando desafios perigosos e desvendando segredos do mundo.`;

        div.innerHTML = `
          <h2>${jogo.name}</h2>
          <p><strong>Data de Lançamento:</strong> ${jogo.released}</p>
          <p><strong>Nota:</strong> ${jogo.rating}</p>
          <p><strong>Plataformas:</strong> ${jogo.platforms.map(p => p.platform.name).join(', ')}</p>
          <p><strong>Descrição:</strong> ${jogo.description_raw || descricaoPadrao}</p>
          <img src="${jogo.background_image}" alt="Imagem do jogo" />
        `;
  
        console.log('Dados do jogo exibidos na tela.');
      })
      .catch(err => {
        console.error('Erro ao carregar dados do jogo:', err);
        document.getElementById('infoJogo').innerText = "Erro ao carregar dados do jogo.";
      });
  };
  
  // 🧠 Busca informações de um boss pela Fan API
  function buscarBoss() {
  const nome = document.getElementById('bossInput').value.trim().toLowerCase();
  const resultadoDiv = document.getElementById('resultadoBoss');
  const blurLayer = document.getElementById('background-blur-layer');
  


  if (!nome) {
    resultadoDiv.innerHTML = '<p style="color:red;">Digite o nome de um boss.</p>';
    return;
  }

  // Ativa o desfoque
  blurLayer.style.backdropFilter = 'blur(6px)';

  // 🔁 Malenia (caso especial)
  if (nome === 'malenia') {
    resultadoDiv.innerHTML = `
      <h3>Malenia, Espada de Miquella</h3>
      <img src="img/malenia.png" alt="Malenia" />
      <p><strong>Localização:</strong> Elphael, Brace of the Haligtree</p>
      <p><strong>Descrição:</strong> Malenia é uma das lutas mais desafiadoras...</p>
      <h4>🔎 Estratégias & Builds recomendadas</h4>
      <p><em>Fraquezas:</em> Sangramento, Congelamento</p>
      <p><em>Estratégias:</em> Mantenha distância durante a Dança das Lâminas...</p>
      <p><em>Builds:</em> Dex/Sangramento, gelo, Mimic Tear</p>
    `;
    return;
  }

  // 🔍 Busca geral
  resultadoDiv.innerHTML = 'Buscando informações sobre o boss...';

  fetch(`https://eldenring.fanapis.com/api/bosses?name=${encodeURIComponent(nome)}`)
    .then(res => {
      if (!res.ok) throw new Error(`Status: ${res.status}`);
      return res.json();
    })
    .then(data => {
      if (!data.data || data.data.length === 0) {
        resultadoDiv.innerHTML = `<p>Nenhum boss chamado <strong>${nome}</strong> foi encontrado.</p>`;
        return;
      }

      const boss = data.data[0];

      resultadoDiv.innerHTML = `
        <h3>${boss.name}</h3>
        ${boss.image ? `<img src="${boss.image}" alt="${boss.name}" />` : ''}
        <p><strong>Localização:</strong> ${boss.location || 'Desconhecida'}</p>
        <p><strong>Descrição:</strong> ${boss.description || 'Sem descrição disponível.'}</p>
        <h4>🔎 Estratégias & Builds recomendadas</h4>
        <p><em>Fraquezas:</em> (adicionar manualmente)</p>
        <p><em>Estratégias:</em> (baseado no estilo de luta)</p>
        <p><em>Builds:</em> (força, fé, magia...)</p>
        
      `;

      exibirComentarios(boss.name);

    })
    .catch(err => {

      resultadoDiv.innerHTML = 'Erro ao buscar o boss.';
      console.error(err);
    });
}

function buscarItem() {
  const nome = document.getElementById('itemInput').value.trim().toLowerCase();
  const resultadoDiv = document.getElementById('resultadoItem');
  const blurLayer = document.getElementById('background-blur-layer');

  if (!nome) {
    resultadoDiv.innerHTML = '<p style="color:red;">Digite o nome de um item ou arma.</p>';
    return;
  }

  blurLayer.style.backdropFilter = 'blur(6px)';
  resultadoDiv.innerHTML = 'Buscando informações...';

  // 🔍 Primeira tentativa: buscar como item
  fetch(`https://eldenring.fanapis.com/api/items?name=${encodeURIComponent(nome)}`)
    .then(res => {
      if (!res.ok) throw new Error(`Status: ${res.status}`);
      return res.json();
    })
    .then(data => {
      if (data.data && data.data.length > 0) {
        const item = data.data[0];
        resultadoDiv.innerHTML = `
          <h3>${item.name}</h3>
          ${item.image ? `<img src="${item.image}" alt="${item.name}" />` : ''}
          <p><strong>Categoria:</strong> ${item.category || 'Desconhecida'}</p>
          <p><strong>Descrição:</strong> ${item.description || 'Sem descrição disponível.'}</p>
          <p><strong>Efeito:</strong> ${item.effect || 'Sem efeito informado.'}</p>
        `;
      } else {
        // Se não achou como item, tenta como arma
        buscarComoArma(nome, resultadoDiv);
      }
    })
    .catch(err => {
      console.error('Erro na busca como item:', err);
      // Ainda tenta como arma se der erro
      buscarComoArma(nome, resultadoDiv);
    });
}

function buscarComoArma(nome, resultadoDiv) {
  fetch(`https://eldenring.fanapis.com/api/weapons?name=${encodeURIComponent(nome)}`)
    .then(res => {
      if (!res.ok) throw new Error(`Status: ${res.status}`);
      return res.json();
    })
    .then(data => {
      if (data.data && data.data.length > 0) {
        const arma = data.data[0];
        resultadoDiv.innerHTML = `
          <h3>${arma.name}</h3>
          ${arma.image ? `<img src="${arma.image}" alt="${arma.name}" />` : ''}
          <p><strong>Categoria:</strong> ${arma.category || 'Desconhecida'}</p>
          <p><strong>Descrição:</strong> ${arma.description || 'Sem descrição disponível.'}</p>
          <p><strong>Escalamento:</strong> ${arma.scalesWith?.map(s => `${s.name}: ${s.scaling}`).join(', ') || 'Não informado'}</p>
          <p><strong>Atributos Requeridos:</strong> ${arma.requiredAttributes?.map(a => `${a.name}: ${a.amount}`).join(', ') || 'Não informado'}</p>
        `;
      } else {
        resultadoDiv.innerHTML = `<p>Nenhum item ou arma chamado <strong>${nome}</strong> foi encontrado.</p>`;
      }
    })
    .catch(err => {
      console.error('Erro na busca como arma:', err);
      resultadoDiv.innerHTML = 'Erro ao buscar o item ou arma.';
    });

    function adicionarComentario() {
      const nome = document.getElementById('nomeUsuario').value.trim();
      const texto = document.getElementById('comentarioTexto').value.trim();
      const nota = parseInt(document.getElementById('notaBoss').value);
      const bossAtual = document.querySelector('#resultadoBoss h3')?.innerText;
    
      if (!bossAtual) return alert('Nenhum boss selecionado.');
      if (!nome || !texto) return alert('Preencha todos os campos.');
    
      const chave = `comentarios_${bossAtual}`;
      const comentarios = JSON.parse(localStorage.getItem(chave)) || [];
    
      comentarios.push({ nome, texto, nota, data: new Date().toLocaleDateString() });
      localStorage.setItem(chave, JSON.stringify(comentarios));
    
      document.getElementById('nomeUsuario').value = '';
      document.getElementById('comentarioTexto').value = '';
      document.getElementById('notaBoss').value = '5';
    
      exibirComentarios(bossAtual);
    }
    
    function exibirComentarios(nomeBoss) {
      const div = document.getElementById('listaComentarios');
      const comentarios = JSON.parse(localStorage.getItem(`comentarios_${nomeBoss}`)) || [];
    
      if (comentarios.length === 0) {
        div.innerHTML = '<p>Seja o primeiro a comentar!</p>';
        return;
      }
    
      div.innerHTML = `<p>${comentarios.length} Comentário(s)</p>` + comentarios.map(c => `
        <div class="comentario">
          <strong>${c.nome}</strong> • ${c.data}<br>
          <span>${'⭐'.repeat(c.nota)} (${c.nota}/5)</span>
          <p>${c.texto}</p>
        </div>
      `).join('');
    }
    
}
