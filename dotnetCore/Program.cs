using System;
using ElectronCgi.DotNet;
using Microsoft.Extensions.Logging;
using System.IO.Compression;
using System.Security.Cryptography;

namespace DotnetCore
{
    class Program
    {
        static void Main(string[] args)
        {
           var connection = new ConnectionBuilder().WithLogging(minimumLogLevel: LogLevel.Trace).Build();
            
            connection.On<string, string>("unzip", UnZip);
            
            connection.Listen();    
        }


    public static string UnZip(string toUnzip)
    {
        try
        {
            byte[] payload = Utils.StringToByteArray(toUnzip);
            byte[] objectArr;
            using GZipStream stream = new(new MemoryStream(payload), CompressionMode.Decompress);
            const int size = 4096;
            byte[] buffer = new byte[size];
            using MemoryStream memory = new();
            int count = 0;
            do
            {
                count = stream.Read(buffer, 0, size);
                if (count > 0)
                {
                    memory.Write(buffer, 0, count);
                }
            }
            while (count > 0);
            objectArr = memory.ToArray();
            return Utils.ToString(objectArr);
        }
        catch (Exception)
        {
            return "";
        }
    }

    public static string DecryptMessage(string dataString, string keyString)
    {
        try
        {
            byte[] data = Utils.StringToByteArray(dataString);
            byte[] key = Utils.StringToByteArray(keyString);
            using var stream = new MemoryStream();
            using var decryptor = Aes.Create();
            decryptor.Mode = CipherMode.ECB;
            decryptor.Padding = PaddingMode.None;
            decryptor.Key = key;
            using CryptoStream lCryptStream = new(stream, decryptor.CreateDecryptor(), CryptoStreamMode.Write);
            lCryptStream.Write(data, 0, data.Length);
            lCryptStream.Close();
            Byte[] decryptedData = stream.ToArray();


            int lastIndex = Array.FindLastIndex(decryptedData, b => b != 0);
            Array.Resize(ref decryptedData, lastIndex + 1);
            return Utils.ToString(decryptedData);
        }
        catch (Exception)
        {
            return "";
        }

    }

    public static string EncryptMessage(string dataString, string keyString)
    {

        try
        {
            byte[] data = Utils.StringToByteArray(dataString);
            byte[] key = Utils.StringToByteArray(keyString);
            int finalPayloadSize = data.Length;
            int numPaddingBytes = 16 - (finalPayloadSize % 16);

            if (numPaddingBytes == 16)
                numPaddingBytes = 0;

            // If data length is less than the final size
            if (data.Length != finalPayloadSize + numPaddingBytes)
            {
                // add and zeroize padding
                Array.Resize<Byte>(ref data, finalPayloadSize + numPaddingBytes);
                for (int i = 0; i < numPaddingBytes; i++)
                    data[data.Length - 1 - i] = 0;
            }

            using MemoryStream stream = new MemoryStream();
            // Create a new Rijndael object.
            using Aes encryptor = Aes.Create();
            encryptor.Mode = CipherMode.ECB;
            encryptor.Padding = PaddingMode.None;
            encryptor.Key = key;
            // Create a CryptoStream using the FileStream and the passed key and
            // initialization vector (IV).
            using CryptoStream crypto = new(stream, encryptor.CreateEncryptor(), CryptoStreamMode.Write);
            crypto.Write(data, 0, data.Length);
            crypto.Close();
            stream.Close();

            return Utils.ToString(stream.ToArray());
        }
        catch (Exception)
        {
            return "";
        }


    }

    }
}
