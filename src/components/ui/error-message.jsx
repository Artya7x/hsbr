export default  function ErrorMessage({ message }){
  if (!message) return null

  return (
    <p className="h-5 text-sm mt-1 text-rose-400">
      {message}
    </p>
  )
}

