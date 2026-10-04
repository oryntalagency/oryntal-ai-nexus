lines = open('src/data/packages.ts', encoding='utf-8').readlines()
# fix solar order
if lines[699].strip().startswith('slug') and lines[700].strip().startswith('icon'):
    slug = lines[698]
    slugf = lines[699]
    iconf = lines[700]
    nichef = lines[701]
    taglinef = lines[702]
    tiersf = lines[703]
    new_block = [slug, slugf, nichef, taglinef, iconf, tiersf]
    # replace
    lines[698:704] = new_block
    open('src/data/packages.ts', 'w', encoding='utf-8').writelines(lines)
    print('ok')
else:
    print('check')
