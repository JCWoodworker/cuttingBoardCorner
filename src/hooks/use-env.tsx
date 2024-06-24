const useEnv = () => {
  return import.meta.env.VITE_ENVIRONMENT
}

export default useEnv