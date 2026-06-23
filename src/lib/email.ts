import { Resend } from "resend";

let _resend: Resend | null = null;

function getResend() {
  if (!_resend) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error("RESEND_API_KEY environment variable is not set");
    }
    _resend = new Resend(apiKey);
  }
  return _resend;
}

const FROM_EMAIL = process.env.EMAIL_FROM || "LegalDocsKE <noreply@legaldocske.vercel.app>";

interface SendOrderEmailParams {
  to: string;
  customerName: string;
  orderId: string;
  documentName: string;
  downloadUrl?: string;
  reviewRequested: boolean;
}

export async function sendOrderConfirmation({
  to,
  customerName,
  orderId,
  documentName,
  downloadUrl,
  reviewRequested,
}: SendOrderEmailParams) {
  const subject = reviewRequested
    ? `Order Confirmed - ${documentName} (Under Review)`
    : `Your ${documentName} is Ready!`;

  const html = reviewRequested
    ? reviewRequestedHtml({ customerName, orderId, documentName })
    : readyForDownloadHtml({ customerName, orderId, documentName, downloadUrl: downloadUrl || "" });

  await getResend().emails.send({
    from: FROM_EMAIL,
    to,
    subject,
    html,
  });
}

function readyForDownloadHtml({
  customerName,
  orderId,
  documentName,
  downloadUrl,
}: {
  customerName: string;
  orderId: string;
  documentName: string;
  downloadUrl: string;
}) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 0; background: #f8fafc;">
      <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
        <div style="text-align: center; margin-bottom: 32px;">
          <div style="display: inline-block; background: #0f172a; color: #d4a843; padding: 12px 20px; border-radius: 8px; font-weight: bold; font-size: 18px;">
            LegalDocsKE
          </div>
        </div>

        <div style="background: white; border-radius: 12px; padding: 32px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
          <h1 style="color: #0f172a; font-size: 24px; margin-bottom: 8px;">
            Your Document is Ready!
          </h1>
          <p style="color: #64748b; margin-bottom: 24px;">
            Hi ${customerName}, your customized document has been generated.
          </p>

          <div style="background: #f8fafc; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
            <p style="margin: 0; color: #64748b; font-size: 14px;">Document</p>
            <p style="margin: 4px 0 0; color: #0f172a; font-weight: 600;">${documentName}</p>
            <p style="margin: 8px 0 0; color: #64748b; font-size: 14px;">Order ID</p>
            <p style="margin: 4px 0 0; color: #0f172a; font-family: monospace; font-size: 14px;">${orderId}</p>
          </div>

          <a href="${downloadUrl}" style="display: block; background: #0f172a; color: white; text-align: center; padding: 14px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px;">
            Download Document
          </a>

          <p style="color: #94a3b8; font-size: 12px; text-align: center; margin-top: 16px;">
            This link expires in 24 hours. Please download and save your document.
          </p>

          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;">

          <p style="color: #64748b; font-size: 13px; line-height: 1.6;">
            This is a template document, not legal advice. For complex matters, please consult a qualified legal professional.
          </p>
        </div>

        <p style="color: #94a3b8; font-size: 12px; text-align: center; margin-top: 24px;">
          LegalDocsKE
        </p>
      </div>
    </body>
    </html>
  `;
}

function reviewRequestedHtml({
  customerName,
  orderId,
  documentName,
}: {
  customerName: string;
  orderId: string;
  documentName: string;
}) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 0; background: #f8fafc;">
      <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
        <div style="text-align: center; margin-bottom: 32px;">
          <div style="display: inline-block; background: #0f172a; color: #d4a843; padding: 12px 20px; border-radius: 8px; font-weight: bold; font-size: 18px;">
            LegalDocsKE
          </div>
        </div>

        <div style="background: white; border-radius: 12px; padding: 32px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
          <h1 style="color: #0f172a; font-size: 24px; margin-bottom: 8px;">
            Order Confirmed!
          </h1>
          <p style="color: #64748b; margin-bottom: 24px;">
            Hi ${customerName}, your order has been received and is being reviewed.
          </p>

          <div style="background: #f8fafc; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
            <p style="margin: 0; color: #64748b; font-size: 14px;">Document</p>
            <p style="margin: 4px 0 0; color: #0f172a; font-weight: 600;">${documentName}</p>
            <p style="margin: 8px 0 0; color: #64748b; font-size: 14px;">Order ID</p>
            <p style="margin: 4px 0 0; color: #0f172a; font-family: monospace; font-size: 14px;">${orderId}</p>
          </div>

          <div style="background: #fef3c7; border: 1px solid #fcd34d; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
            <p style="margin: 0; color: #92400e; font-size: 14px;">
              <strong>What happens next:</strong> An advocate will review your document within 1-2 business days.
              You'll receive another email once it's approved and ready for download.
            </p>
          </div>

          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;">

          <p style="color: #64748b; font-size: 13px; line-height: 1.6;">
            Questions? Reply to this email for support.
          </p>
        </div>

        <p style="color: #94a3b8; font-size: 12px; text-align: center; margin-top: 24px;">
          LegalDocsKE
        </p>
      </div>
    </body>
    </html>
  `;
}
