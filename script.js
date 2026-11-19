document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Copy-to-Clipboard, Toast & Contribute Buttons ---
  const toastElement = document.getElementById('copyToast');
  const toastText = toastElement ? toastElement.querySelector('span') : null;
  const copyToast = (toastElement && window.bootstrap)
    ? new bootstrap.Toast(toastElement)
    : null;

  const ugiftUrl = 'https://ugift529.com';

  function copyCodeFromElement(codeElement) {
    if (!codeElement) return;
    const textToCopy = codeElement.firstChild.textContent.trim();

    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        if (toastText && copyToast) {
          toastText.textContent = `Copied: ${textToCopy}`;
          copyToast.show();
        }
      })
      .catch(err => {
        console.error('Clipboard failed:', err);
      });
  }

  // Clicking the code directly copies it
  document.querySelectorAll('.code').forEach(element => {
    element.addEventListener('click', () => {
      copyCodeFromElement(element);
    });
  });

  // Clicking CONTRIBUTE copies that card's code AND opens Ugift in a new tab
  document.querySelectorAll('.contribute-btn').forEach(button => {
    button.addEventListener('click', () => {
      const cardInfo = button.closest('.profile__info');
      const codeElement = cardInfo ? cardInfo.querySelector('.code') : null;

      copyCodeFromElement(codeElement);
      window.open(ugiftUrl, '_blank', 'noopener,noreferrer');
    });
  });

  // --- 2. Terminal Supporters Typewriter ---
  const supporters = [
    "Loading recent contributers...",
    "1. Mike & Marge Alder contributed to Addelines college plan on 12/30/2025",
    "2. Mike & Marge Alder contributed to Otises college plan on 09/30/2026",
    "3. ( Your name here )",
    "Your contributions make a lasting impact on Addeline and Otises future!",
    "We are truly grateful for your generosity <3"
  ];

  const terminalCard = document.getElementById("terminalCard");
  const terminalBody = document.getElementById("terminalBody");
  const terminalLines = document.getElementById("terminalLines");
  const typingText = document.getElementById("typingText");

  if (terminalCard && terminalBody && terminalLines && typingText) {
    let lineIndex = 0;
    let charIndex = 0;
    let isPaused = false;

    function trimOverflowLines() {
      while (
        terminalBody.scrollHeight > terminalBody.clientHeight &&
        terminalLines.firstElementChild
      ) {
        terminalLines.removeChild(terminalLines.firstElementChild);
      }
    }

    window.addEventListener("resize", trimOverflowLines);

    terminalCard.addEventListener("mouseenter", () => { isPaused = true; });
    terminalCard.addEventListener("mouseleave", () => { isPaused = false; });

    function typeSupporter() {
      if (isPaused) {
        setTimeout(typeSupporter, 100);
        return;
      }

      const currentLine = supporters[lineIndex];

      if (charIndex < currentLine.length) {
        typingText.textContent += currentLine.charAt(charIndex);
        charIndex++;
        setTimeout(typeSupporter, 45);
      } else {
        setTimeout(() => {
          if (isPaused) {
            setTimeout(typeSupporter, 100);
            return;
          }

          const completedDiv = document.createElement("div");
          completedDiv.className = "terminal-line";
          completedDiv.innerHTML = `<span class="prompt">&gt;</span>${currentLine}`;
          terminalLines.appendChild(completedDiv);

          trimOverflowLines();

          typingText.textContent = "";
          charIndex = 0;
          lineIndex++;

          if (lineIndex >= supporters.length) {
            lineIndex = 0;
          }

          setTimeout(typeSupporter, 300);
        }, 600);
      }
    }

    typeSupporter();
  }
});