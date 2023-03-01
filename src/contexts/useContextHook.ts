import { useContext } from 'react'

const useContextHook = <T>(Context: React.Context<T>) => {
  const contextValue = useContext<T>(Context)

  if (!contextValue) {
    const contextName = Context.displayName

    throw new Error(
      `${contextName} context must be consumed inside the ${contextName} Provider`,
    )
  }

  return contextValue
}

export default useContextHook
