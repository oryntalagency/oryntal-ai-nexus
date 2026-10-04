lines = open('src/data/packages.ts', encoding='utf-8').readlines()
lines[921] = '  },\n'
lines.insert(922, '  {\n')
open('src/data/packages.ts', 'w', encoding='utf-8').writelines(lines)
print('ok')
