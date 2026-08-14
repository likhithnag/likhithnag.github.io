// Cmd/Ctrl+Enter submits the contact form, matching the hint shown next to the button
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.term-form-grid');
  if (!form) return;

  form.addEventListener('keydown', (e) => {
    const isSubmitCombo = (e.metaKey || e.ctrlKey) && e.key === 'Enter';
    if (isSubmitCombo) {
      e.preventDefault();
      form.requestSubmit();
    }
  });
});
