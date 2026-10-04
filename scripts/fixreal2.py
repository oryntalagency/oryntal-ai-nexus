lines = open('src/data/packages.ts', encoding='utf-8').readlines()
replacement = '''        pricing: {
          setup: "₹2,49,999 one-time",
          monthly: "₹49,999/month",
          minimumCommitment: "3 months after go-live"
        },
        outcome: [
          "Central control over all projects and teams",
          "Better campaign and lead-source performance visibility",
          "Stronger sales process and agent accountability",
        ],
      },
    ],
  },
'''
new_lines = lines[:901] + [replacement] + lines[908:]
open('src/data/packages.ts', 'w', encoding='utf-8').writelines(new_lines)
print('ok')
