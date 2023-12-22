// Function to generate HTML for questions and options
function generateOMRSheet() {
    const questionsContainer = document.getElementById('questionsContainer');
  
    for (let i = 1; i <= 200; i++) {
      const questionDiv = document.createElement('div');
      questionDiv.classList.add('question');
  
      const questionNumber = document.createElement('p');
      questionNumber.textContent = `Question ${i}:`;
      questionDiv.appendChild(questionNumber);
  
      const options = ['A', 'B', 'C', 'D','E','NO'];
      options.forEach((option) => {
        const input = document.createElement('input');
        input.setAttribute('type', 'radio');
        input.setAttribute('id', `q${i}${option}`);
        input.setAttribute('name', `question${i}`);
        input.setAttribute('value', option);
  
        const label = document.createElement('label');
        label.setAttribute('for', `q${i}${option}`);
        label.textContent = option;
  
        questionDiv.appendChild(input);
        questionDiv.appendChild(label);
        

      });
  
      questionsContainer.appendChild(questionDiv);

    }
    
  }
  
  // Run the function when the page loads
  window.addEventListener('load', generateOMRSheet);
  

  
   
// Handling form submission for downloading
document.getElementById('omrForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
  
    let fileContent = '';
    for (let i = 1; i <= 200; i++) {
      const selectedOption = document.querySelector(`input[name="question${i}"]:checked`);
      if (selectedOption) {
        fileContent += `Question ${i}: ${selectedOption.value}\n`;
      } else {
        fileContent += `Question ${i}: Not answered\n`;
      }
    }
  
    // Create a blob and trigger download
    const blob = new Blob([fileContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
  
    const a = document.createElement('a');
    a.href = url;
    a.download = 'OMR_Answers.txt';
    document.body.appendChild(a);
    a.click();
  
    // Cleanup
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 0);
  });
  
  