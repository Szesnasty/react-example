/** MUI drops its own prop filter once `shouldForwardProp` is given, so system props are re-blocked here. */
export const createShouldForwardProp = (...styleOnlyProps: readonly string[]) => {
  const blockedProps = new Set<PropertyKey>([...styleOnlyProps, 'ownerState', 'theme', 'sx', 'as'])

  return (propName: PropertyKey) => !blockedProps.has(propName)
}
