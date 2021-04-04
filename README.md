# Multistreaming-Assist (typescript)



## 배포시 유의사항

프로그램에 멀웨어를 심어 배포하는 행위를 막기위해, 프로그램의 exe 파일 및 zip 파일만 단독으로 배포하는 행위를 금지합니다. (반드시 Github 링크를 통한 공유만 해주시기 바랍니다.)



## 사용법

> ### RTMP Key 정보 입력하고 nginx.exe 실행하기  
> ![스트리밍](https://user-images.githubusercontent.com/38521736/113496929-975c1180-9539-11eb-808b-a41b9ae3708d.png)  
> 1. 상단 입력칸(1)에 원하는 RTMP Key 값을 입력하고 'NGINX 실행' 버튼(2)을 클릭  
> 
> ![스트리밍2](https://user-images.githubusercontent.com/38521736/113496931-9dea8900-9539-11eb-8e7a-1335a4a71cb0.png)  
> 2. nginx.exe가 실행되면 우측 하단의 버튼이 붉은색으로 변하면서 'NGINX 정지' 버튼으로 변경된다  
>
   
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
> * 이때, 방송 시작이 정상적으로 진행되지 않는다면 nginx.exe가 제대로 실행되지 않았을 가능성이 높다
   
## 주의사항

> ### nginx.exe가 실행되지 않는 경우
> 현재까지 확인된 nginx가 제대로 실행되지 않는 경우는 크게 다음과 같음
> 1. 유효하지 않은 twitch/youtbe 키 값 및 추가적인 rtmp 서버/키 값이 입력된 경우
> 2. Windows Defender 외의 서드파티 백신을 사용 할 경우
