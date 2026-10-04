lines = open('src/data/packages.ts', encoding='utf-8').readlines()
# block is lines[698:704] (6 lines) - but line 704 is the closing } of this object? let us see
# we need to fix: 698={,699=slug,700=icon,701=tagline,702=tiers,703=nicheName - so move nicheName after slug, tagline after niche
# correct: slug, nicheName, tagline, icon, tiers
new_lines = lines[:699] + [lines[703]] + [lines[701]] + [lines[700]] + lines[702:704]  # rough
# better: replace 698-703 with correct order
correct = [lines[698], lines[699], lines[703], lines[701], lines[700], lines[702]]
lines[698:704] = correct
open('src/data/packages.ts', 'w', encoding='utf-8').writelines(lines)
print('ok')
