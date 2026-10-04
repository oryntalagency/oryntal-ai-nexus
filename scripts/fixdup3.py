lines = open('src/data/packages.ts', encoding='utf-8').readlines()
if 'outcome' in lines[908]:
    del lines[908]
open('src/data/packages.ts', 'w', encoding='utf-8').writelines(lines)
print('ok')
