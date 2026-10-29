"""Render the illustrated invitation film. Requires Pillow and imageio-ffmpeg.
Run from the project root: python3 scripts/render-film.py
The generated artwork remains untouched; captions are separate video overlays.
"""
import subprocess
import tempfile
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
import imageio_ffmpeg

ROOT = Path(__file__).resolve().parent.parent
FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()
W, H = 1200, 800
WINE = '#71342f'
GOLD = '#896735'

def caption_file(path, lines):
    canvas = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    draw = ImageDraw.Draw(canvas)
    for text, y, size, font_index, color in lines:
        font = ImageFont.truetype(str(ROOT / f'public/fonts/font-{font_index}.ttf'), size)
        if '♥' not in text:
            draw.text((W / 2, y), text, font=font, anchor='mt', fill=color)
        else:
            heart_font = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf', round(size * .68))
            parts = text.split('♥')
            runs = []
            for index, part in enumerate(parts):
                if index:
                    runs.append(('♥', heart_font, round(size * .15)))
                runs.append((part, font, 0))
            x = (W - sum(draw.textlength(run, font=face) for run, face, shift in runs)) / 2
            for run, face, shift in runs:
                draw.text((x, y + shift), run, font=face, anchor='lt', fill=color)
                x += draw.textlength(run, font=face)
    canvas.save(path)

scenes = [
    ('temple-landscape.png', [
        ('The Story of Kanth ♥ Samyuktha', 85, 24, 0, GOLD),
        ('Chandra Kanth', 124, 64, 2, WINE),
        ('&', 185, 32, 8, GOLD),
        ('Samyuktha', 220, 64, 2, WINE),
        ('Engagement Invitation', 290, 30, 8, GOLD),
    ]),
    ('engagement-ritual.png', [
        ('With love, we invite you to our engagement', 100, 25, 0, GOLD),
        ('Thursday, 12 November 2026', 155, 51, 2, WINE),
        ('10:30 AM', 215, 42, 2, WINE),
        ('Gopalraopet', 280, 36, 2, GOLD),
        ('Medak, Telangana, India', 322, 24, 2, GOLD),
    ]),
    ('temple-landscape.png', [
        ('Your presence is our most cherished blessing.', 90, 29, 0, GOLD),
        ('Invited by', 142, 23, 0, GOLD),
        ('Thodupunuri Prabhakar', 180, 43, 2, WINE),
        ('&', 228, 28, 8, GOLD),
        ('Thodupunuri Amrutha', 263, 43, 2, WINE),
        ('Designed and developed with ♥ by Surya Teja Gupta', 320, 17, 5, GOLD),
    ]),
]

with tempfile.TemporaryDirectory(prefix='engagement-film-') as folder:
    directory = Path(folder)
    clips = []
    for index, (asset, lines) in enumerate(scenes):
        captions = directory / f'captions-{index}.png'
        clip = directory / f'scene-{index}.mp4'
        caption_file(captions, lines)
        video_filter = (
            "[0:v]scale=1800:-1,zoompan=z='1+on*0.00022':"
            "x='iw/2-iw/zoom/2':y='ih/2-ih/zoom/2':d=1:s=1200x800:fps=30,"
            "setsar=1,format=yuv420p[bg];[bg][1:v]overlay=0:0:format=auto,format=yuv420p[out]"
        )
        command = [FFMPEG, '-hide_banner', '-loglevel', 'error', '-y',
                   '-loop', '1', '-framerate', '30', '-i', str(ROOT / 'public/media/indian' / asset),
                   '-loop', '1', '-framerate', '30', '-i', str(captions),
                   '-filter_complex', video_filter, '-map', '[out]', '-t', '8',
                   '-c:v', 'libx264', '-preset', 'fast', '-crf', '23', '-threads', '2', str(clip)]
        subprocess.run(command, check=True)
        clips.append(clip)
        print(f'Rendered scene {index + 1}/3', flush=True)
    output = directory / 'invitation-film.mp4'
    destination = ROOT / 'public/media/indian/invitation-film.mp4'
    command = [FFMPEG, '-hide_banner', '-loglevel', 'error', '-y']
    for clip in clips:
        command += ['-i', str(clip)]
    command += ['-filter_complex',
                '[0:v][1:v]xfade=transition=fade:duration=1.4:offset=6.6[first];'
                '[first][2:v]xfade=transition=fade:duration=1.4:offset=13.2,format=yuv420p[out]',
                '-map', '[out]', '-c:v', 'libx264', '-preset', 'fast', '-crf', '23',
                '-threads', '2', '-movflags', '+faststart', '-metadata',
                'title=The Story of Kanth and Samyuktha - Engagement Invitation', str(output)]
    subprocess.run(command, check=True)
    output.replace(destination)
    print(f'Saved {destination} ({destination.stat().st_size / 1024 / 1024:.1f} MB)', flush=True)
