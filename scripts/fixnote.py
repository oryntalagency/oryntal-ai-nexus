with open('src/data/packages.ts', encoding='utf-8') as f:
    s = f.read()
old = '''  // Note: Separate costs apply (WhatsApp Business API messaging, CRM subscriptions, AI model/API usage,
  // voice-agent telephony, Meta/Google ad spend/campaign management, hosting/domain/LMS/ERP/payment gateway costs,
  // and major features beyond included monthly optimisations). "What's not included" covers these specifics.'''
new = '''  // Note: Costs like WhatsApp Business API messaging, CRM software subscriptions, AI model/API usage, voice-agent telephony, and ad spend are separate from the package price — add a short "What's not included" line or expandable note listing: WhatsApp Business API setup/messaging charges, CRM software subscriptions and licences, AI model/API usage charges, voice-agent telephony charges, Meta/Google ad spend and campaign management, hosting/domain/LMS/ERP/payment gateway costs, and major new features beyond the included monthly optimisations.'''
if old in s:
    s = s.replace(old, new)
with open('src/data/packages.ts', 'w', encoding='utf-8') as f:
    f.write(s)
print('ok')
