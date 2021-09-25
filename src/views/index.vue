<template>
  <div>
    <!-- 幻灯片-->
    <div class="block">
      <el-carousel trigger="click" height="450px">
        <el-carousel-item
          v-for="banner in bannerList"
          :key="banner.id"
          style="background: #040b1b"
        >
          <router-link :to="banner.linkUrl">
            <img
              width="100%"
              height="100%"
              :src="banner.imageUrl"
              :alt="banner.title"
            />
          </router-link>
        </el-carousel-item>
      </el-carousel>
    </div>

    <div id="aCoursesList">
      <!-- 网校课程 开始 -->
      <div>
        <section class="container">
          <header class="comm-title">
            <h2 class="tac">
              <span class="c-333">热门课程</span>
            </h2>
          </header>
          <div>
            <article class="comm-course-list">
              <ul class="of" id="bna">
                <li v-for="course in courseList" :key="course.id">
                  <div class="cc-l-wrap">
                    <section class="course-img">
                      <img
                        width="270"
                        height="150"
                        :src="course.cover"
                        :alt="course.title"
                      />
                      <div class="cc-mask">
                        <router-link
                          :to="`/course/${course.id}`"
                          title="开始学习"
                          class="comm-btn c-btn-1"
                          >开始学习</router-link
                        >
                      </div>
                    </section>
                    <h3 class="hLh30 txtOf mt10">
                      <router-link
                        :to="`/course/${course.id}`"
                        :title="course.title"
                        class="course-title fsize18 c-333"
                      >
                        {{ course.title }}
                      </router-link>
                    </h3>
                    <section class="mt10 hLh20 of">
                      <span
                        class="fr jgTag bg-green"
                        v-if="Number(course.price) === 0"
                      >
                        <i class="c-fff fsize12 f-fA">免费</i>
                      </span>
                      <span class="fl jgAttr c-ccc f-fA">
                        <i class="c-999 f-fA">{{ course.viewCount }}人学习</i>
                        |
                        <i class="c-999 f-fA">{{ course.buyCount }}人购买</i>
                      </span>
                    </section>
                  </div>
                </li>
              </ul>
              <div class="clear"></div>
            </article>
            <section class="tac pt20">
              <router-link
                to="/course"
                title="全部课程"
                class="comm-btn c-btn-2"
                >全部课程</router-link
              >
            </section>
          </div>
        </section>
      </div>
      <!-- /网校课程 结束 -->
      <!-- 网校名师 开始 -->
      <div>
        <section class="container">
          <header class="comm-title">
            <h2 class="tac">
              <span class="c-333">热门名师</span>
            </h2>
          </header>
          <div>
            <article class="i-teacher-list">
              <ul class="of">
                <li v-for="teacher in teacherList" :key="teacher.id">
                  <section class="i-teach-wrap">
                    <div class="i-teach-pic">
                      <router-link
                        :to="`/teacher/${teacher.id}`"
                        :title="teacher.name"
                      >
                        <img
                          width="270"
                          height="150"
                          :alt="teacher.name"
                          :src="teacher.avatar"
                        />
                      </router-link>
                    </div>
                    <div class="mt10 hLh30 txtOf tac">
                      <router-link
                        :to="`/teacher/${teacher.id}`"
                        :title="teacher.name"
                        class="fsize18 c-666"
                      >
                        {{ teacher.name }}
                      </router-link>
                    </div>
                    <div class="hLh30 txtOf tac">
                      <span class="fsize14 c-999">{{ teacher.career }}</span>
                    </div>
                    <div class="mt15 i-q-txt">
                      <p class="c-999 f-fA">{{ teacher.intro }}</p>
                    </div>
                  </section>
                </li>
              </ul>
              <div class="clear"></div>
            </article>
            <section class="tac pt20">
              <router-link
                to="/teacher"
                title="全部讲师"
                class="comm-btn c-btn-2"
                >全部讲师</router-link
              >
            </section>
          </div>
        </section>
      </div>
      <!-- /网校名师 结束 -->
    </div>
  </div>
</template>

<script>
import bannerApi from "@/api/banner";
import teacherApi from "@/api/teacher";
import courseApi from "@/api/course";

export default {
  data() {
    return {
      swiperOption: {
        //配置分页
        pagination: {
          el: ".swiper-pagination", //分页的dom节点
        },
        //配置导航
        navigation: {
          nextEl: ".swiper-button-next", //下一页dom节点
          prevEl: ".swiper-button-prev", //前一页dom节点
        },
      },
      bannerList: [],
      teacherList: [],
      courseList: [],
    };
  },
  created() {
    this.getBannerList();
    this.getHotTeacherList();
    this.getHotCourseList();
  },
  methods: {
    // 获取热门课程列表
    getHotCourseList() {
      courseApi.getHotCourseList().then((res) => {
        this.courseList = res.data;
      });
    },

    // 获取热门老师列表
    getHotTeacherList() {
      teacherApi.getHotTeacherList().then((res) => {
        this.teacherList = res.data;
      });
    },

    // 获取轮播图列表
    getBannerList() {
      bannerApi.getIndexPageBannerList().then((res) => {
        this.bannerList = res.data;
      });
    },
  },
};
</script>

<style>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
