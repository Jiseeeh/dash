export default function Page({ params }: { params: { id: string } }) {
  return <div>My New: {params.id}</div>;
}
