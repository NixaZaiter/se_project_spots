export function setBtnText(evt, text) {
  const submitBtn = evt.submitter;
  return (submitBtn.textContent = text);
}
