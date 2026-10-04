s = open('src/data/packages.ts', encoding='utf-8').read()
while s.count('{') > s.count('}'):
    s += '}\n'
while s.count('[') > s.count(']'):
    s += ']\n'
open('src/data/packages.ts', 'w', encoding='utf-8').write(s)
print(s.count('{'), s.count('}'))
