lines = open('src/data/packages.ts', encoding='utf-8').readlines()
lines[694] = '    }\n'
lines[695] = '  },\n'
lines[696] = '],\n'
new_lines = lines[:697] + ['  },\n'] + lines[697:]
open('src/data/packages.ts', 'w', encoding='utf-8').writelines(new_lines)
print('ok')
