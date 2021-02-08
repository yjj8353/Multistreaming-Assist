# Todo List

</br>1. Typescript로 전환
</br>~~2. Electron 윈도우 위치 기억 기능~~
</br>3. 리팩토링

-----

# Multistreaming-Assist

* Electron 6.13.7



## 배포시 유의사항

프로그램에 멀웨어를 심어 배포하는 행위를 막기위해, 프로그램의 exe 파일 및 zip 파일만 단독으로 배포하는 행위를 금지합니다. (반드시 Github 링크를 통한 공유만 해주시기 바랍니다.)



## 사용법

> ### nginx.conf 파일 생성하기
> ![1](https://user-images.githubusercontent.com/38521736/76392598-3c4b0000-63b5-11ea-90a6-69ba3752cd82.png)
> 1. 압축을 푼 후 'Multistreaming-Assist.exe' 실행
> 2. twitch/youtube/기타 RTMP 주소 및 키 값을 채움 (필요한 것만 채우면 됩니다.)
> ~~3. 좌측 하단의 'nginx.conf 생성' 버튼 클릭~~
> ~~* nginx.conf 파일은 한번 생성하면 다시 'nginx.conf 생성' 버튼을 클릭하기 전까지 유지됩니다~~
> * 더이상 'nginx.conf 생성' 버튼을 누를 필요가 없습니다.
   
***
   
> ### nginx.exe 실행하기/정지하기
> ![1](https://user-images.githubusercontent.com/38521736/76392609-410fb400-63b5-11ea-9a9d-151993476a81.png)
> 1. nginx.conf 파일이 생성된걸 확인 후, 우측 하단 푸른색의 'nginx 실행' 버튼을 클릭하면 아래 사진과 같이 붉은색의 'nginx 정지' 버튼으로 변경되고 nginx.exe가 실행됨(작업 관리자 확인 요망)
> 
> ![2](https://user-images.githubusercontent.com/38521736/76392612-41a84a80-63b5-11ea-98d4-4dfbff9e1dec.png)
   
***
   
> ### OBS 연동
> ![OBS](https://user-images.githubusercontent.com/38521736/76396069-e2016d80-63bb-11ea-91c0-1fede7df5b0c.png)
> 1. 서버 칸에 'rtmp://localhost/live' 라고 적은 후
> 2. 적용 버튼 클릭
> 3. 확인 버튼 클릭
   
***
   
> ### 방송 시작
> ![OBS2](https://user-images.githubusercontent.com/38521736/76395806-6f908d80-63bb-11ea-9e29-4ab51dc02191.png)
> 1. nginx.exe 실행 상태에서 우측 하단의 '방송 시작' 버튼 클릭 
> * 이때, 방송 시작이 정상적으로 진행되지 않는다면 nginx.exe가 제대로 실행되지 않았을 가능성이 높으므로 작업 관리자를 열어 확인 요망
   
## 주의사항

> ### nginx.exe가 실행되지 않는 경우
> 현재까지 확인된 nginx가 제대로 실행되지 않는 경우는 크게 다음과 같음
> 1. 유효하지 않은 twitch/youtbe 키 값 및 추가적인 rtmp 서버/키 값이 입력된 경우
> 2. Windows Defender 외의 서드파티 백신을 사용 할 경우
