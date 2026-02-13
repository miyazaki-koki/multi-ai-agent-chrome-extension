const taskInput = document.getElementById('task-input');
const executeBtn = document.getElementById('execute-btn');
executeBtn.addEventListener('click', async () => {
    const task = taskInput.value.trim();
    if (!task) return alert('Enter a task');
    chrome.runtime.sendMessage({action: 'execute', task}, (response) => {
          document.getElementById('result-content').textContent = response?.result || 'No result';
          document.getElementById('result-output').classList.remove('hidden');
    });
});
