// script.js - substitua o arquivo anterior (que usava prompt)
// o arquivo anterior que você subiu usava prompt(); eu troquei para modal + validação visual.
// (referência ao seu upload anterior: script.js). :contentReference[oaicite:3]{index=3}

document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.btn-register');
  const modal = document.getElementById('modal');
  const modalTitle = document.getElementById('modal-event-title');
  const form = document.getElementById('regForm');
  const closeBtn = document.getElementById('modal-close');
  const cancelBtn = document.getElementById('cancelBtn');
  const toast = document.getElementById('toast');
  let currentSessionEl = null;
  let currentEventText = '';

  buttons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const session = e.target.closest('.session');
      if (!session) return;
      currentSessionEl = session;
      currentEventText = session.dataset.event || session.querySelector('h3').innerText;
      openModal(currentEventText);
    });
  });

  function openModal(eventText) {
    modalTitle.textContent = 'Inscrição — ' + eventText;
    modal.classList.remove('hidden');
    modal.setAttribute('aria-hidden', 'false');
    // limpar form
    form.reset();
    form.elements['nome'].focus();
  }

  function closeModal() {
    modal.classList.add('hidden');
    modal.setAttribute('aria-hidden', 'true');
  }

  closeBtn.addEventListener('click', closeModal);
  cancelBtn.addEventListener('click', closeModal);
  // fechar clicando fora
  modal.querySelector('.modal-backdrop').addEventListener('click', closeModal);

  form.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const nome = form.elements['nome'].value.trim();
    const turma = form.elements['turma'].value.trim();
    const matricula = form.elements['matricula'].value.trim();

    // validação simples
    if (!nome || !turma || !/^[0-9]+$/.test(matricula)) {
      alert('Preencha os campos corretamente (matrícula apenas números).');
      return;
    }

    // marcar visualmente a sessão como inscrita (pequeno destaque)
    if (currentSessionEl) {
      currentSessionEl.classList.add('selected');
      // adiciona um badge simples
      if (!currentSessionEl.querySelector('.badge')) {
        const b = document.createElement('div');
        b.className = 'badge';
        b.textContent = 'Inscrito';
        currentSessionEl.appendChild(b);
      }
    }

    // gerar CSV simples e forçar download
    const data = {
      evento: currentEventText,
      nome, turma, matricula,
      quando: new Date().toISOString()
    };
    const csv = [
      ['Evento', 'Nome', 'Turma', 'Matricula', 'Timestamp'],
      [data.evento, data.nome, data.turma, data.matricula, data.quando]
    ].map(r => r.map(c => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n');

    const filename = `${nome.replace(/\s+/g, '_')}_inscricao.csv`;
    downloadFile(csv, filename, 'text/csv;charset=utf-8;');

    // fechar modal e mostrar toast
    closeModal();
    showToast('Inscrição gerada e baixada — confira seu arquivo');
  });

  function downloadFile(content, filename, mime) {
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  function showToast(text, ms = 2200) {
    toast.textContent = text;
    toast.classList.remove('hidden');
    setTimeout(() => {
      toast.classList.add('hidden');
    }, ms);
  }
});
document.querySelectorAll('.btn-register').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const eventName = e.target.closest('.session').dataset.event;
    modalTitle.textContent = `Inscrição — ${eventName}`;
    eventoSelecionado.value = eventName;
    modal.classList.remove('hidden'); // 🔥 Aqui que faz aparecer só quando clica
  });
});

// 🔥 Controle do menu lateral
const menuToggle = document.getElementById('menuToggle');
const offcanvas = document.getElementById('offcanvas');
const closeMenu = document.getElementById('closeMenu');

menuToggle.addEventListener('click', () => {
  offcanvas.classList.add('show');
});

closeMenu.addEventListener('click', () => {
  offcanvas.classList.remove('show');
});

// Fecha menu ao clicar em link e faz rolagem suave
document.querySelectorAll('#offcanvas a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetId = link.getAttribute('href').substring(1);
    const section = document.getElementById(targetId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    offcanvas.classList.remove('show');
  });
});
function openModal(eventText, session) {
  modalTitle.textContent = 'Inscrição — ' + eventText;

  // Preenche informativo do palestrante
  const img = session.querySelector('img')?.src || 'img/default.jpg';
  const nome = session.querySelector('h3')?.innerText || 'Nome não informado';
  const tema = eventText;

  document.querySelector('#info-nome').textContent = nome;
  document.querySelector('#info-tema').innerHTML = '<strong>Tema:</strong> ' + tema;
  document.querySelector('.info-avatar').src = img;
  document.querySelector('#info-formacoes').innerHTML = `
    <li>Formação 1</li>
    <li>Formação 2</li>
    <li>Formação 3</li>
  `;

  modal.classList.remove('hidden');
  modal.setAttribute('aria-hidden', 'false');
  form.reset();
  form.elements['nome'].focus();
}
function openModal(session) {
  const nome = session.dataset.nome || "Nome não informado";
  const tema = session.dataset.tema || session.querySelector("h3")?.innerText;
  const img = session.dataset.img || session.querySelector("img")?.src || "img/default.jpg";
  const formacoes = session.dataset.formacoes ? session.dataset.formacoes.split(";") : [];

  // Título do modal
  modalTitle.textContent = "Inscrição — " + tema;
  eventoSelecionado.value = tema;

  // Preenche o informativo
  document.querySelector("#info-nome").textContent = nome;
  document.querySelector("#info-tema").innerHTML = "<strong>Tema:</strong> " + tema;
  document.querySelector(".info-avatar").src = img;

  const lista = document.querySelector("#info-formacoes");
  lista.innerHTML = "";
  formacoes.forEach(f => {
    const li = document.createElement("li");
    li.textContent = f.trim();
    lista.appendChild(li);
  });

  // Exibir modal
  modal.classList.remove("hidden");
  modal.setAttribute("aria-hidden", "false");
  form.reset();
  form.elements["nome"].focus();
}
