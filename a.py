import sys
import os
from pytube import YouTube

download_path = os.path.expanduser('~') + '/Downloads/'
os.chdir(download_path)

def download_video(url, download_type):
    try:
        yt = YouTube(url)

        if download_type == 'MP3':
            audio_stream = yt.streams.filter(only_audio=True, file_extension='mp4').first()
            file_path = os.path.join(download_path, yt.title + ".mp3")
            audio_stream.download(filename = yt.title + '.mp3')
            print(f"Downloaded {yt.title} as MP3")
        elif download_type == 'MP4':
            video_stream = yt.streams.get_highest_resolution()
            file_path = os.path.join(download_path,  yt.title + '.mp4')
            video_stream.download(filename = yt.title + '.mp4')
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
