import QRCode from 'react-qr-code';

export default function QRCodeDisplay({ shortUrl }) {
  return (
    <div className="text-center">
      <h2 className="text-lg font-bold mb-2">QR Code:</h2>
      {shortUrl ? (
        <QRCode value={shortUrl} />
      ) : (
        <p className="text-gray-500">Shorten a URL to generate a QR code</p>
      )}
    </div>
  );
}
