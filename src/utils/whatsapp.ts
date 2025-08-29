const WHATSAPP_NUMBER = "5531995531183";
const DEFAULT_MSG_BASE = "Olá! Quero saber mais sobre o DoctorChatBot e ver uma demonstração.";

export function waLink(source: string = "site"): string {
  const msg = `${DEFAULT_MSG_BASE}\n\n— origem: ${source}`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}