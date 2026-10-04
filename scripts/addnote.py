with open("src/data/packages.ts", encoding="utf-8") as f:
    s = f.read()
note_full = """
  // Note: Costs like WhatsApp Business API messaging, CRM software subscriptions, AI model/API usage, voice-agent telephony, and ad spend are separate from the package price — add a short "What's not included" line or expandable note listing: WhatsApp Business API setup/messaging charges, CRM software subscriptions and licences, AI model/API usage charges, voice-agent telephony charges, Meta/Google ad spend and campaign management, hosting/domain/LMS/ERP/payment gateway costs, and major new features beyond the included monthly optimisations.
"""
# Find the position before real-estate
real = s.find('"real-estate"')
if real != -1:
    start_obj = s.rfind('  {\n    slug:', 0, real)
    if start_obj != -1:
        # check if note already there
        if 'not included' not in s[max(0,start_obj-200):start_obj]:
            s2 = s[:start_obj] + note_full + s[start_obj:]
            with open("src/data/packages.ts", "w", encoding="utf-8") as f:
                f.write(s2)
print("ok")
