export var slugFinder = (map, slug, original = slug, number = 0) => {
  if (!map[slug]) return slug
  number += 1
  const newSlug = `${original}-${number}`
  return slugFinder(map, newSlug, original, number)
}
