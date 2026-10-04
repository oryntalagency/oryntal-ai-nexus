lines = open('src/data/packages.ts', encoding='utf-8').readlines()
# Fix the broken section
lines[907] = '        outcome: [\n'
lines[908] = '          "Central control over all projects and teams",\n'
lines[909] = '          "Better campaign and lead-source performance visibility",\n'
lines[910] = '          "Stronger sales process and agent accountability",\n'
lines[911] = '        ],\n'
lines[912] = '      },\n'
lines[913] = '    ],\n'
lines[914] = '  },\n'
open('src/data/packages.ts', 'w', encoding='utf-8').writelines(lines)
print('ok')
