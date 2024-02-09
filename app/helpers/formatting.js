export function humanize(key) {
  if (!key) return "";

  // Replace underscores with spaces
  let humanizedKey = key.replace(/_/g, " ");

  // Capitalize the first letter of each word
  humanizedKey = humanizedKey.replace(/\b\w/g, (char) => char.toUpperCase());

  return humanizedKey;
}

export function breakLines(text, Container) {
  if (!text) return "";

  return text.split("\n").map((line) => (
    <Container className="text-center" key={line}>
      {line}
    </Container>
  ));
}
