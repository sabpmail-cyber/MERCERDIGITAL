export function Surface({
  children,
  style,
}: {
  children: React.ReactNode
  style?: React.CSSProperties
}) {
  return (
    <div
      style={{
        backgroundColor: 'var(--bgColor-default)',
        border: '1px solid var(--borderColor-default)',
        borderRadius: 'var(--borderRadius-large)',
        ...style,
      }}
    >
      {children}
    </div>
  )
}
