from photoon.tasks import longtime_add
import time

if __name__ == '__main__':
    result = longtime_add.delay(1, 2)       # celery에서 ai 실행시키는 함수
    # 이 지점에서 작업이 완료되지 않으므로 False를 반환합니다.
    print('Task finished? ', result.ready())       # celery에서 함수 실행이 됐는지 확인
    print('Task result: ', result.result)       # 결과값 확인
    # 10초 후 작업이 완료됩니다.
    time.sleep(10)
    # 이 지점에서 작업이 완료되고 ready()가 True를 반환합니다.
    print('Task finished? ', result.ready())
    print('Task result: ', result.result)
