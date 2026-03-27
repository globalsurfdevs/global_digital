import * as React from "react";

interface ContactEmailProps {
    name: string;
    email: string;
    phone: string;
    company?: string;
    budget?: string;
    service?: string;
    message?: string;
    pageUrl?: string;
}

export const ContactTemplate = ({
    name,
    email,
    phone,
    company,
    budget,
    service,
    message,
    pageUrl,
}: ContactEmailProps) => {
    return (
        <div
            style={{
                backgroundColor: "#f3f4f6",
                padding: "32px 16px",
                fontFamily: "Arial, Helvetica, sans-serif",
            }}
        >
            {/* Card */}
            <div
                style={{
                    maxWidth: "640px",
                    margin: "0 auto",
                    backgroundColor: "#ffffff",
                    borderRadius: "10px",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
                    overflow: "hidden",
                }}
            >
                {/* Header */}
                <div
                    style={{
                        backgroundColor: "#111827",
                        padding: "20px 24px",
                        color: "#ffffff",
                    }}
                >
                    <h2
                        style={{
                            margin: 0,
                            fontSize: "20px",
                            fontWeight: 600,
                        }}
                    >
                        New Contact Inquiry
                    </h2>
                    <p
                        style={{
                            margin: "4px 0 0",
                            fontSize: "13px",
                            color: "#d1d5db",
                        }}
                    >
                        A user has submitted the contact form
                    </p>
                </div>

                {/* Body */}
                <div style={{ padding: "24px" }}>
                    <table
                        width="100%"
                        cellPadding={0}
                        cellSpacing={0}
                        style={{ borderCollapse: "collapse" }}
                    >
                        <tbody>
                            <Row label="Full Name" value={name} />
                            <Row label="Email Address" value={email} />
                            <Row label="Phone Number" value={phone} />
                            {company && <Row label="Company" value={company} />}
                            {service && <Row label="Service Interested In" value={service} />}
                            {budget && <Row label="Budget Range" value={budget} />}
                            {pageUrl && <Row label="Submitted From" value={pageUrl} />}
                        </tbody>
                    </table>

                    {/* Message Section */}
                    {message && (
                        <div
                            style={{
                                marginTop: "20px",
                                padding: "16px",
                                backgroundColor: "#f9fafb",
                                borderRadius: "6px",
                                border: "1px solid #e5e7eb",
                            }}
                        >
                            <p
                                style={{
                                    margin: "0 0 8px",
                                    fontWeight: 600,
                                    color: "#111827",
                                }}
                            >
                                Message
                            </p>
                            <p
                                style={{
                                    margin: 0,
                                    fontSize: "14px",
                                    color: "#374151",
                                    whiteSpace: "pre-wrap",
                                }}
                            >
                                {message}
                            </p>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div
                    style={{
                        padding: "16px 24px",
                        backgroundColor: "#f9fafb",
                        fontSize: "12px",
                        color: "#6b7280",
                        textAlign: "center",
                    }}
                >
                    This message was sent via the website contact form.
                </div>
            </div>
        </div>
    );
};

const Row = ({
    label,
    value,
}: {
    label: string;
    value: React.ReactNode;
}) => (
    <tr>
        <td
            style={{
                padding: "10px 0",
                fontWeight: 600,
                width: "180px",
                verticalAlign: "top",
                color: "#111827",
            }}
        >
            {label}
        </td>
        <td
            style={{
                padding: "10px 0",
                color: "#374151",
                verticalAlign: "top",
                whiteSpace: "pre-wrap",
            }}
        >
            {value}
        </td>
    </tr>
);