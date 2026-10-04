lines = open('/tmp/packages_orig.ts', encoding='utf-8').readlines()
# remove extra brace
for i, line in enumerate(lines):
    if i > 690 and i < 700:
        pass
# look for the specific bad pattern
# in original after e-commerce ends, may have extra }
# remove line with just '  },' if it's causing issue - looking at structure
# simpler: find and fix the known issue
pass
