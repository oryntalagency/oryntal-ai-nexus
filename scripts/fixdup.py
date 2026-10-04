lines = open('src/data/packages.ts', encoding='utf-8').readlines()
new_lines = lines[:907] + lines[911:]
open('src/data/packages.ts', 'w', encoding='utf-8').writelines(new_lines)
print('ok')
