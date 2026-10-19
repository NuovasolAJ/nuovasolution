import type { ReactNode } from "react";

/**
 * The shared mail shell (MAIL_SHELL_v2, owner decision R16-9, audit order 2026-10-12 R16-K; R19 closing order
 * 2026-10-19 §11): one wrapper for every mail Nuova sends to an agency, used here for the login previews of the
 * weekly report and the morning brief and, as the static file docs/website_redesign/mail/MAIL_SHELL_v2.html with
 * the same slots, by Hosting (weekly report) and Daily (morning brief). Table layout, inline styles, no web font,
 * readable with images blocked (the logo has an alt text and the wordmark stands beside it), one column that fits a
 * phone. Brand colours from app/globals.css: ink #1a1917, canvas #fbfaf7, sunken #f6f4ee, muted #635f58, hairline
 * #e4e1da, accent #c9a96e.
 *
 * Slots, in order: eyebrow · subject · greeting · summary · tasks (morning) · figures (weekly) · context · nextAction ·
 * button · footer. A task is not a figure: it has a kind, a customer, what they want, a reasoned priority, a held
 * draft if there is one, a state, a next step and the link (Daily, 2026-10-19).
 * Never in a mail: n8n footers, internal ids, raw fields, infrastructure links, decorative figures.
 */
export interface MailTask {
  kind: string;
  who: string;
  lines: string[];
  priority?: string;
  draft?: { label: string; text: string };
  state: string;
  step: string;
  href: string;
  open: string;
}

export interface MailShellProps {
  logoUrl: string;
  logoAlt: string;
  eyebrow: string;
  subject: string;
  greeting: string;
  summary: ReactNode;
  tasks?: MailTask[];
  figures?: { label: string; value: string }[];
  context?: ReactNode;
  nextAction?: ReactNode;
  button?: { href: string; label: string; under?: string };
  footer: ReactNode;
}

const font = "Inter, 'Segoe UI', Helvetica, Arial, sans-serif";
const caption = { margin: 0, fontSize: 12, letterSpacing: "0.06em", textTransform: "uppercase" as const, color: "#635f58" };

export function MailShell(p: MailShellProps) {
  return (
    <table role="presentation" width="100%" cellPadding={0} cellSpacing={0} style={{ background: "#f3f1ec", fontFamily: font, color: "#1a1917" }} data-mail-shell="v2">
      <tbody>
        <tr>
          <td align="center" style={{ padding: "24px 12px" }}>
            <table role="presentation" width="100%" cellPadding={0} cellSpacing={0} style={{ maxWidth: 600, background: "#fbfaf7", borderRadius: 16, border: "1px solid #e4e1da" }}>
              <tbody>
                <tr>
                  <td style={{ padding: "22px 28px 12px" }}>
                    <table role="presentation" cellPadding={0} cellSpacing={0}><tbody><tr>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <td style={{ verticalAlign: "middle", paddingRight: 10 }}><img src={p.logoUrl} alt={p.logoAlt} width={28} height={28} style={{ display: "block", width: 28, height: 28 }} data-mail-logo /></td>
                      <td style={{ verticalAlign: "middle", fontSize: 15, fontWeight: 600, letterSpacing: "-0.01em" }}>NuovaSolution</td>
                    </tr></tbody></table>
                  </td>
                </tr>
                <tr><td style={{ padding: "0 28px" }}><p style={{ margin: 0, fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", color: "#635f58" }} data-mail-slot="eyebrow">{p.eyebrow}</p></td></tr>
                <tr><td style={{ padding: "6px 28px 0" }}><p style={{ margin: 0, fontSize: 22, lineHeight: 1.25, fontWeight: 600, letterSpacing: "-0.01em" }} data-mail-slot="subject">{p.subject}</p></td></tr>
                <tr><td style={{ padding: "18px 28px 0", fontSize: 16, lineHeight: 1.5 }} data-mail-slot="greeting">{p.greeting}</td></tr>
                <tr><td style={{ padding: "8px 28px 0", fontSize: 16, lineHeight: 1.5 }} data-mail-slot="summary">{p.summary}</td></tr>
                {p.tasks && p.tasks.length > 0 && (
                  <tr>
                    <td style={{ padding: "18px 28px 0" }} data-mail-slot="tasks">
                      {p.tasks.map((t) => (
                        <table key={t.who + t.kind} role="presentation" width="100%" cellPadding={0} cellSpacing={0} style={{ border: "1px solid #e4e1da", borderRadius: 12, background: "#ffffff", marginBottom: 10 }} data-mail-task>
                          <tbody>
                            <tr>
                              <td style={{ padding: "14px 16px 0" }}>
                                <p style={caption}>{t.kind}</p>
                                <p style={{ margin: "4px 0 0", fontSize: 17, lineHeight: 1.3, fontWeight: 600, color: "#1a1917" }}>{t.who}</p>
                              </td>
                            </tr>
                            {t.lines.map((ln) => <tr key={ln}><td style={{ padding: "6px 16px 0", fontSize: 15, lineHeight: 1.45, color: "#1a1917" }}>{ln}</td></tr>)}
                            {t.priority && (
                              <tr><td style={{ padding: "8px 16px 0", fontSize: 14, lineHeight: 1.45, color: "#4a4742" }}><span style={{ display: "inline-block", width: 8, height: 8, borderRadius: 999, background: "#c9a96e", verticalAlign: "middle", marginRight: 6 }} />{t.priority}</td></tr>
                            )}
                            {t.draft && (
                              <tr>
                                <td style={{ padding: "10px 16px 0" }}>
                                  <table role="presentation" width="100%" cellPadding={0} cellSpacing={0} style={{ background: "#f6f4ee", borderRadius: 8 }}><tbody><tr><td style={{ padding: "10px 12px" }}>
                                    <p style={caption}>{t.draft.label}</p>
                                    <p style={{ margin: "4px 0 0", fontSize: 14, lineHeight: 1.45, color: "#1a1917" }}>{t.draft.text}</p>
                                  </td></tr></tbody></table>
                                </td>
                              </tr>
                            )}
                            <tr><td style={{ padding: "10px 16px 0", fontSize: 14, lineHeight: 1.45, color: "#635f58" }}>{t.state}</td></tr>
                            <tr>
                              <td style={{ padding: "8px 16px 14px" }}>
                                <table role="presentation" width="100%" cellPadding={0} cellSpacing={0}><tbody><tr>
                                  <td style={{ fontSize: 15, lineHeight: 1.45, fontWeight: 600, color: "#1a1917" }}>{t.step}</td>
                                  <td align="right" style={{ whiteSpace: "nowrap", paddingLeft: 12 }}><a href={t.href} style={{ display: "inline-block", padding: "8px 14px", borderRadius: 999, background: "#1a1917", color: "#f8f6f1", textDecoration: "none", fontSize: 14, fontWeight: 600 }} data-mail-task-open>{t.open}</a></td>
                                </tr></tbody></table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      ))}
                    </td>
                  </tr>
                )}
                {p.figures && p.figures.length > 0 && (
                  <tr>
                    <td style={{ padding: "18px 28px 0" }}>
                      <table role="presentation" width="100%" cellPadding={0} cellSpacing={0} style={{ border: "1px solid #e4e1da", borderRadius: 12, background: "#ffffff" }} data-mail-slot="figures">
                        <tbody>
                          {p.figures.map((f, i) => (
                            <tr key={f.label}>
                              <td style={{ padding: "11px 16px", fontSize: 15, color: "#4a4742", borderTop: i === 0 ? "none" : "1px solid #ece9e2" }}>{f.label}</td>
                              <td align="right" style={{ padding: "11px 16px", fontSize: 15, fontWeight: 700, borderTop: i === 0 ? "none" : "1px solid #ece9e2", whiteSpace: "nowrap" }}>{f.value}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </td>
                  </tr>
                )}
                {p.context && <tr><td style={{ padding: "16px 28px 0", fontSize: 14, lineHeight: 1.5, color: "#4a4742" }} data-mail-slot="context">{p.context}</td></tr>}
                {p.nextAction && <tr><td style={{ padding: "14px 28px 0", fontSize: 15, lineHeight: 1.5 }} data-mail-slot="next-action">{p.nextAction}</td></tr>}
                {p.button && (
                  <tr>
                    <td style={{ padding: "22px 28px 0" }}>
                      <table role="presentation" cellPadding={0} cellSpacing={0}><tbody><tr>
                        <td style={{ background: "#1a1917", borderRadius: 999 }}><a href={p.button.href} style={{ display: "inline-block", padding: "13px 24px", color: "#f8f6f1", textDecoration: "none", fontSize: 15, fontWeight: 600 }} data-mail-slot="button" data-email-button>{p.button.label}</a></td>
                      </tr></tbody></table>
                      {p.button.under && <p style={{ margin: "8px 0 0", fontSize: 13, color: "#635f58" }}>{p.button.under}</p>}
                    </td>
                  </tr>
                )}
                <tr><td style={{ padding: "26px 28px 24px" }}><p style={{ margin: 0, paddingTop: 14, borderTop: "1px solid #e4e1da", fontSize: 12, lineHeight: 1.5, color: "#635f58" }} data-mail-slot="footer">{p.footer}</p></td></tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
