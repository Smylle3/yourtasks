import useWidth from "./useWith"

export const useMobile = () => {
  const screenWidth = useWidth()
  return screenWidth < 930
}

export default useMobile
