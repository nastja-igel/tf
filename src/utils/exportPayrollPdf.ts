import jsPDF from 'jspdf'

export interface PayrollPdfData {
  id: string
  name: { full: string }
  status: string
  subtitle?: string
  summary: Array<{ label: string; value: string | number }>
  dailyEntries?: Array<{ day: number | string; dayName: string; hours: string; project: string }>
}

const STATUS_COLORS: Record<string, [number, number, number]> = {
  Open:     [74,  63,  203],
  Alert:    [210, 131, 38],
  Approved: [34,  144, 87],
  Locked:   [79,  86,  94],
}

const PAGE_W  = 210
const PAGE_H  = 297
const MARGIN  = 20
const INNER_W = PAGE_W - MARGIN * 2

/**
 * Generates and downloads a payroll PDF for the given drawer row.
 * Called directly from the Drawer component on "Export Payroll" / "Download Report" click.
 */
export function exportPayrollPdf(row: PayrollPdfData): void {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
  const F = 'helvetica'
  let y = 0

  // ── Header strip ────────────────────────────────────────────────
  doc.setFillColor(22, 22, 22)
  doc.rect(0, 0, PAGE_W, 20, 'F')

  doc.setFont(F, 'bold')
  doc.setFontSize(10)
  doc.setTextColor(255, 255, 255)
  doc.text('PAYROLL EXPORT', MARGIN, 13)

  const today = new Date().toLocaleDateString('en-GB', {
    day: '2-digit', month: 'long', year: 'numeric',
  })
  doc.setFont(F, 'normal')
  doc.setFontSize(8)
  doc.setTextColor(160, 165, 175)
  doc.text(`Generated ${today}`, PAGE_W - MARGIN, 13, { align: 'right' })

  y = 32

  // ── Employee name ────────────────────────────────────────────────
  doc.setFont(F, 'bold')
  doc.setFontSize(20)
  doc.setTextColor(22, 22, 22)
  doc.text(row.name.full, MARGIN, y)
  y += 7

  // Sub-line: ID · subtitle
  const subParts = [row.id, row.subtitle].filter(Boolean)
  doc.setFont(F, 'normal')
  doc.setFontSize(9)
  doc.setTextColor(87, 94, 102)
  doc.text(subParts.join('  ·  '), MARGIN, y)
  y += 7

  // Status pill
  const [sr, sg, sb] = STATUS_COLORS[row.status] ?? [22, 22, 22]
  const pillText  = row.status.toUpperCase()
  const pillPad   = 4
  const pillH     = 5.5
  // Measure text width at 7pt
  doc.setFontSize(7)
  doc.setFont(F, 'bold')
  const tw = (doc.getStringUnitWidth(pillText) * 7) / doc.internal.scaleFactor
  const pillW = tw + pillPad * 2

  doc.setFillColor(sr, sg, sb)
  doc.roundedRect(MARGIN, y, pillW, pillH, 1.5, 1.5, 'F')
  doc.setTextColor(255, 255, 255)
  doc.text(pillText, MARGIN + pillPad, y + 3.9)
  y += 13

  // ── Section divider ──────────────────────────────────────────────
  function divider() {
    doc.setDrawColor(225, 228, 232)
    doc.line(MARGIN, y, PAGE_W - MARGIN, y)
    y += 9
  }

  divider()

  // ── Summary grid ─────────────────────────────────────────────────
  if (row.summary.length > 0) {
    sectionHeading('SUMMARY')

    const perRow = 4
    const chunks: typeof row.summary[] = []
    for (let i = 0; i < row.summary.length; i += perRow) {
      chunks.push(row.summary.slice(i, i + perRow))
    }

    chunks.forEach(chunk => {
      const colW = INNER_W / chunk.length
      chunk.forEach((s, i) => {
        const x = MARGIN + i * colW
        doc.setFont(F, 'normal')
        doc.setFontSize(8)
        doc.setTextColor(87, 94, 102)
        doc.text(String(s.label), x, y)

        doc.setFont(F, 'bold')
        doc.setFontSize(15)
        doc.setTextColor(22, 22, 22)
        doc.text(String(s.value), x, y + 9)
      })
      y += 20
    })

    divider()
  }

  // ── Daily breakdown table ────────────────────────────────────────
  if (row.dailyEntries && row.dailyEntries.length > 0) {
    sectionHeading('DAILY BREAKDOWN')

    // Column layout  [day, dayName, hours, project]
    const COL_X   = [MARGIN, MARGIN + 14, MARGIN + 34, MARGIN + 58]
    const COL_HDR = ['Day', 'Weekday', 'Hours', 'Project']
    const ROW_H   = 7

    // Table header row
    doc.setFillColor(242, 244, 247)
    doc.rect(MARGIN, y, INNER_W, ROW_H, 'F')
    doc.setFont(F, 'bold')
    doc.setFontSize(8)
    doc.setTextColor(55, 59, 64)
    COL_HDR.forEach((h, i) => doc.text(h, COL_X[i] + 1, y + 5))
    y += ROW_H

    // Data rows
    row.dailyEntries.forEach((entry, idx) => {
      // Alternate row bg
      if (idx % 2 === 0) {
        doc.setFillColor(250, 251, 253)
        doc.rect(MARGIN, y, INNER_W, ROW_H, 'F')
      }

      doc.setFont(F, 'normal')
      doc.setFontSize(8)
      doc.setTextColor(22, 22, 22)
      doc.text(String(entry.day),     COL_X[0] + 1, y + 5)
      doc.text(String(entry.dayName), COL_X[1] + 1, y + 5)
      doc.text(String(entry.hours),   COL_X[2] + 1, y + 5)

      // Truncate project name to available width
      const maxW  = PAGE_W - MARGIN - COL_X[3] - 2
      const lines = doc.splitTextToSize(String(entry.project), maxW)
      doc.text(lines[0], COL_X[3] + 1, y + 5)

      y += ROW_H
    })

    y += 4
    divider()
  }

  // ── Footer ───────────────────────────────────────────────────────
  doc.setDrawColor(220, 225, 230)
  doc.line(MARGIN, PAGE_H - 16, PAGE_W - MARGIN, PAGE_H - 16)
  doc.setFont(F, 'normal')
  doc.setFontSize(7.5)
  doc.setTextColor(128, 135, 143)
  doc.text(
    'This document was generated automatically by the Worktime Approvals system.',
    MARGIN, PAGE_H - 10,
  )
  doc.text('Page 1 of 1', PAGE_W - MARGIN, PAGE_H - 10, { align: 'right' })

  // ── Save ─────────────────────────────────────────────────────────
  const safeSub = (row.subtitle ?? '').replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_-]/g, '')
  const fileName = `payroll_${row.id}${safeSub ? '_' + safeSub : ''}.pdf`
  doc.save(fileName)

  // ── Helpers ──────────────────────────────────────────────────────
  function sectionHeading(text: string) {
    doc.setFont(F, 'bold')
    doc.setFontSize(7.5)
    doc.setTextColor(87, 94, 102)
    doc.text(text, MARGIN, y)
    y += 6
  }
}
