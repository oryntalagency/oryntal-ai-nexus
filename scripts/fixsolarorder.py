lines = open('src/data/packages.ts', encoding='utf-8').readlines()
block = lines[698:704]
new_block = [block[0], block[1], block[3], block[4], block[2], block[5]]
lines[698:704] = new_block
open('src/data/packages.ts', 'w', encoding='utf-8').writelines(lines)
print('ok')
