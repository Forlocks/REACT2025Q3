'use server';

export async function downloadCsv(cards: any[]) {
  const csvHeaders = "UID;Class ID;Name;Registry;Status;Date Status;Ship Class;Owner;Operator\n";
  const csvContent = csvHeaders + cards.map(card => 
    `${card.uid};${card.classId};${card.name};${card.registry};${card.status};${card.dateStatus};${card.shipClass};${card.owner};${card.operator}`
  ).join('\n');

  return csvContent;
}
