
import sys
from pytube import YouTube

def download_video(url, download_type):
    try:
        yt = YouTube(url)

        if download_type == 'MP3':
            audio_stream = yt.streams.filter(only_audio=True, file_extension='mp4').first()
            audio_stream.download()
            print(f"Downloaded {yt.title} as MP3")
        elif download_type == 'MP4':
            video_stream = yt.streams.get_highest_resolution()
            video_stream.download()
            print(f"Downloaded {yt.title} as MP4")
        else:
            print("Invalid download type")

    except Exception as e:
        print(f"Error downloading the video: {e}")

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python download.py <YouTube_URL> <MP3/MP4>")
    else:
        url = sys.argv[1]
        download_type = sys.argv[2]
        download_video(url, download_type)
