with open("src/data/packages.ts", encoding="utf-8") as f:
    s = f.read()
note = """\n  // Note: Separate costs apply (WhatsApp Business API messaging, CRM subscriptions, AI model/API usage,\n  // voice-agent telephony, Meta/Google ad spend/campaign management, hosting/domain/LMS/ERP/payment gateway costs,\n  // and major features beyond included monthly optimisations). "What's not included" covers these specifics.\n"""
real = s.find('"real-estate"')
if real != -1:
    start_obj = s.rfind('  {\n    slug:', 0, real)
    if start_obj != -1:
        s2 = s[:start_obj] + note + s[start_obj:]
        with open("src/data/packages.ts", "w", encoding="utf-8") as f:
            f.write(s2)
        print("ok")
