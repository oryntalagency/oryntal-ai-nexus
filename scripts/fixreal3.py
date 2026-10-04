lines = open('src/data/packages.ts', encoding='utf-8').readlines()
lines[903] = '          setup: "₹2,49,999 one-time",\n'
lines[904] = '          monthly: "₹49,999/month",\n'
open('src/data/packages.ts', 'w', encoding='utf-8').writelines(lines)
print('ok')
