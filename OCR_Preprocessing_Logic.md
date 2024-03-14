1. all brackets to angular
2. all tags should be properly closed if something is not within tags highlight in red with option to delete
3. tags in keyword list, did yiu mean
4. all docs start with <html> and end with </html>
  - all leading space and characters before the first < are wrong
  - but what if the first tag is html>
5. list of non closing tags

Cases: Existence of atleast < to know it was a tag
<|space|text
text|space|>
< |space| text |space| >

output:
everything inside valid tags.
