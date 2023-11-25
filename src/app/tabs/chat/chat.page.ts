import { IonContent } from '@ionic/angular/standalone';
import {
  Component,
  ElementRef,
  NgZone,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { addIcons } from 'ionicons';
import { chatbubble, chatbubbles, closeOutline, send } from 'ionicons/icons';
const API_URL =
  'https://bu4dvfsm5sse3smpbpotjxwjom0lxpid.lambda-url.us-west-1.on.aws/stream';
const API_KEY = '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';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class ChatPage implements OnInit {
  message = '';
  chats: any = [];
  isTyping = false;
  @ViewChild('chatScreen') chatScreen: ElementRef | undefined = undefined;
  sentences$ = new BehaviorSubject<string[]>([]);
  uuid: any;

  constructor(private route: Router) {
    addIcons({ chatbubble, chatbubbles, send, closeOutline });
  }

  scrollBottom() {
    const element = this.chatScreen?.nativeElement;
    const lastBuble = element?.lastElementChild;
    const lastBubleMeta = lastBuble?.querySelector('.meta');
    if (lastBubleMeta) {
      lastBubleMeta.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
        inline: 'end',
      });


    } else {
      console.error('Element is not available');
    }
  }
  async getChatCompletion(chats: any[]) {
    try {
      // Fetch the response from the OpenAI API with the signal from AbortController
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: this.chats[this.chats.length - 1].content,
          session_id: this.uuid,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Read the response as a stream of data
      const reader = response!.body!.getReader();
      const decoder = new TextDecoder('utf-8');

      // Initialize an empty string to hold incoming data
      let data = '';

      //new message from the assistant
      this.chats.push({
        role: 'assistant',
        content: '',
      });
      //TODO: Scroll to Bottom
      this.scrollBottom();
      let sentence: string = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          break;
        }
        data += decoder.decode(value, { stream: true });
        this.chats[this.chats.length - 1].content += decoder.decode(value, {
          stream: true,
        });
        this.scrollBottom();
      }

      // Complete any partial data remaining
      if (data.startsWith('data: ')) {
        const jsonStr = data.slice('data: '.length);
        const chunkParsed = JSON.parse(jsonStr);
        const letter = chunkParsed.choices[0].delta.content;
        this.chats[this.chats.length - 1].content += letter;

        // Update UI here if needed
      }
    } catch (error) {
      console.error('Fetch Error: ', error);
    }
  }

  async chat(message: string | undefined | null | number) {
    if (!message) {
      return;
    }
    this.isTyping = true;
    this.chats.push({
      role: 'user',
      content: message,
    });

    this.scrollBottom();
    this.message = '';
    this.getChatCompletion(this.chats);
  }

  ngOnInit() {
    this.sentences$.subscribe((sentences) => {
      if (sentences.length > 0) {
        console.log(sentences);

        let message = new SpeechSynthesisUtterance();
        message.text = sentences[0];
        message.lang = /[\u0600-\u06FF]/.test(sentences[0]) ? 'ar-EG' : 'en-US';
        message.rate = 1.0;
        message.pitch = 1.0;
        message.volume = 1.0;

        window.speechSynthesis.speak(message);
        this.sentences$.next(sentences.slice(1));
      }
    });

    this.uuid = localStorage.getItem('uuid') || uuidv4();
  }

  goBack() {
    this.route.navigate(['tabs/health']);
  }
}
