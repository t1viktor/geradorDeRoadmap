
const iconOptions = {
    Code: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>',
    Database: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>',
    Lock: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>',
    Share2: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>',
    Zap: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>',
    Calendar: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>'
};

let stepCount = 0;

function createStepHTML(index) {
    return `
        <div class="p-4 bg-gray-50 rounded-md relative transition-all duration-300 ease-in-out" data-step-index="${index}">
            <h3 class="font-medium mb-2">Etapa ${index + 1}</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label for="date-${index}" class="block text-sm font-medium text-gray-700">Data</label>
                    <input type="date" id="date-${index}" name="date-${index}" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                </div>
                <div>
                    <label for="icon-${index}" class="block text-sm font-medium text-gray-700">Ícone</label>
                    <select id="icon-${index}" name="icon-${index}" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                        ${Object.keys(iconOptions).map(icon => `<option value="${icon}">${icon}</option>`).join('')}
                    </select>
                </div>
                <div class="md:col-span-2">
                    <label for="title-${index}" class="block text-sm font-medium text-gray-700">Título</label>
                    <input type="text" id="title-${index}" name="title-${index}" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                </div>
                <div class="md:col-span-2">
                    <label for="description-${index}" class="block text-sm font-medium text-gray-700">Descrição</label>
                    <textarea id="description-${index}" name="description-${index}" rows="3" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"></textarea>
                </div>
            </div>
            ${index > 0 ? `
                <button type="button" class="remove-step absolute top-2 right-2 text-red-600 hover:text-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 rounded-full p-1 transition-colors duration-200" aria-label="Remover etapa">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                    </svg>
                </button>
            ` : ''}
        </div>
    `;
}

document.getElementById('addStepBtn').addEventListener('click', () => {
    const stepsContainer = document.getElementById('stepsContainer');
    stepsContainer.insertAdjacentHTML('beforeend', createStepHTML(stepCount));
    stepCount++;
    updateStepNumbers();
});

document.getElementById('stepsContainer').addEventListener('click', (e) => {
    if (e.target.closest('.remove-step')) {
        e.target.closest('[data-step-index]').remove();
        updateStepNumbers();
    }
});

function updateStepNumbers() {
    document.querySelectorAll('#stepsContainer > div').forEach((step, index) => {
        step.querySelector('h3').textContent = `Etapa ${index + 1}`;
        step.dataset.stepIndex = index;
    });
}

document.getElementById('roadmapForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const projectTitle = formData.get('projectTitle');
    const projectObjective = formData.get('projectObjective');
    const steps = [];

    document.querySelectorAll('#stepsContainer > div').forEach((stepElement, index) => {
        steps.push({
            date: formData.get(`date-${index}`),
            icon: formData.get(`icon-${index}`),
            title: formData.get(`title-${index}`),
            description: formData.get(`description-${index}`)
        });
    });

    generateRoadmap(projectTitle, projectObjective, steps);
});

function generateRoadmap(projectTitle, projectObjective, steps) {
    const iconOptions = {
        Code: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>',
        Database: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>',
        Lock: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>',
        Share2: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>',
        Zap: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>',
        Calendar: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>'
    };

    const roadmapHTML = `
    <div class="roadmap-container max-w-6xl mx-auto p-4">
  <!-- Objetivos do Projeto -->
  <div class="p-4 bg-gray-800 rounded-lg text-white mb-8 text-center">
    <h2 class="text-2xl md:text-4xl font-bold mb-4">${projectTitle}</h2>
    <p class="text-sm md:text-base">${projectObjective}</p>
  </div>

  <!-- Mensagem para clicar na etapa -->
  <div class="text-center text-xs md:text-sm text-gray-400 mb-8 info-text">
    Clique em uma etapa para finalizá-la
  </div>

  <!-- Etapas do Projeto -->
  <div class="flex flex-col md:grid md:grid-cols-[1fr,auto,1fr] gap-4 md:gap-8">
    <!-- Coluna Esquerda: Primeira Metade das Etapas -->
    <div class="roadmap-left-column flex flex-col items-center md:items-start space-y-4 md:space-y-8">
      ${steps.slice(0, Math.ceil(steps.length / 2)).map((step, index) => `
        <div class="roadmap-step flex flex-col items-center md:${index % 2 === 0 ? 'flex-row-reverse' : 'flex-row'} space-y-4 md:space-x-4 mb-4 md:mb-8 w-full md:w-auto">
          <div class="w-12 h-12 md:w-16 md:h-16 bg-gray-800 rounded-full flex items-center justify-center">
            ${iconOptions[step.icon]}
          </div>
          <div class="bg-gray-700 p-4 rounded-lg w-full md:w-auto relative step-div text-center md:text-left" data-step-index="${index}" onclick="toggleStepCompleted(this)">
            <h3 class="text-sm md:text-base font-semibold mb-2">${step.title}</h3>
            <p class="text-xs md:text-sm">${step.description}</p>
            <p class="text-xs text-gray-400 mt-2">Data: ${step.date}</p>
          </div>
        </div>
      `).join('')}
    </div>

    <!-- Divisor Central -->
    <div class="roadmap-divider hidden md:block w-px bg-gray-700 mx-auto relative">
      <div class="w-3 h-3 bg-gray-700 rounded-full absolute top-0 left-1/2 transform -translate-x-1/2"></div>
      <div class="w-3 h-3 bg-gray-700 rounded-full absolute bottom-0 left-1/2 transform -translate-x-1/2"></div>
    </div>

    <!-- Coluna Direita: Segunda Metade das Etapas -->
    <div class="roadmap-right-column flex flex-col items-center md:items-start space-y-4 md:space-y-8">
      ${steps.slice(Math.ceil(steps.length / 2)).map((step, index) => `
        <div class="roadmap-step flex flex-col items-center md:flex-row space-y-4 md:space-x-4 mb-4 md:mb-8 w-full md:w-auto">
          <div class="w-12 h-12 md:w-16 md:h-16 bg-gray-800 rounded-full flex items-center justify-center">
            ${iconOptions[step.icon]}
          </div>
          <div class="bg-gray-700 p-4 rounded-lg w-full md:w-auto relative step-div text-center md:text-left" data-step-index="${Math.ceil(steps.length / 2) + index}" onclick="toggleStepCompleted(this)">
            <h3 class="text-sm md:text-base font-semibold mb-2">${step.title}</h3>
            <p class="text-xs md:text-sm">${step.description}</p>
            <p class="text-xs text-gray-400 mt-2">Data: ${step.date}</p>
          </div>
        </div>
      `).join('')}
    </div>
  </div>

  <!-- Progresso Geral -->
  <div class="p-4 bg-gray-800 rounded-lg text-white mt-8">
    <h2 class="text-sm md:text-base font-semibold mb-2">PROGRESSO GERAL</h2>
    <p class="text-xs md:text-sm mb-4">Acompanhamento do progresso de implementação das funcionalidades planejadas.</p>
    <div class="bg-gray-700 h-2 rounded-full overflow-hidden">
      <div id="progress-bar" class="bg-green-500 h-full transition-all duration-1000" style="width: 0%"></div>
    </div>
    <div class="flex justify-between text-xs text-gray-400 mt-2">
      <span id="progress-start">0%</span>
      <span>100%</span>
    </div>
  </div>
</div>

`;

  document.getElementById('app').classList.add('hidden');
  const roadmapView = document.getElementById('roadmapView');
  roadmapView.classList.remove('hidden');
  roadmapView.innerHTML = roadmapHTML;
}




// Initialize with one step
document.getElementById('addStepBtn').click();

function toggleStepCompleted(stepDiv) {
    // Adiciona ou remove a classe de etapa concluída
    if (!stepDiv.classList.contains('completed')) {
        stepDiv.classList.add('completed');
        stepDiv.insertAdjacentHTML('beforeend', '<p class="text-green-500 text-xs mt-2">Etapa finalizada :)</p>');
    } else {
        stepDiv.classList.remove('completed');
        const completedText = stepDiv.querySelector('.text-green-500');
        if (completedText) completedText.remove();
    }
    
    updateProgress();
}

function updateProgress() {
    const totalSteps = document.querySelectorAll('.step-div').length;
    const completedSteps = document.querySelectorAll('.step-div.completed').length;

    // Calcula o progresso como porcentagem
    const progressPercentage = (completedSteps / totalSteps) * 100;

    // Atualiza a barra de progresso
    const progressBar = document.getElementById('progress-bar');
    progressBar.style.width = `${progressPercentage}%`;

    // Atualiza o texto do progresso de início
    const progressStart = document.getElementById('progress-start');
    progressStart.textContent = `${Math.round(progressPercentage)}%`;
}
