<template>
  <div id="aCoursesList" class="bg-fa of">
    <!-- /课程列表 开始 -->
    <section class="container">
      <header class="comm-title">
        <h2 class="fl tac">
          <span class="c-333">全部课程</span>
        </h2>
      </header>
      <section class="c-sort-box">
        <section class="condition">
          <dl>
            <dt style="display: flex">
              <span class="c-999 fsize14">课程类别</span>
            </dt>
            <dd class="c-s-dl-li">
              <ul class="clearfix">
                <li>
                  <a
                    title="全部"
                    :class="{ active: firstCategoryActiveIndex === -1 }"
                    @click="reset()"
                    href="#"
                    >全部</a
                  >
                </li>

                <!-- 一级分类 -->
                <li
                  v-for="(categoryFirst, index) in categoryList"
                  :key="categoryFirst.id"
                >
                  <a
                    :title="categoryFirst.title"
                    @click="handleFirstCategoryClickEvent(index)"
                    :class="{ active: firstCategoryActiveIndex === index }"
                    href="#"
                  >
                    {{ categoryFirst.title }}
                  </a>
                </li>
              </ul>
            </dd>
          </dl>
          <dl>
            <dt>
              <span class="c-999 fsize14"></span>
            </dt>
            <dd class="c-s-dl-li">
              <ul class="clearfix">
                <!-- 二级分类 -->
                <li
                  v-for="(subCategory, index) in categoryList[
                    secondCategoryIndex
                  ].children"
                  :key="subCategory.id"
                >
                  <a
                    v-show="firstCategoryActiveIndex !== -1"
                    :title="subCategory.title"
                    :class="{ active: secondCategoryActiveIndex === index }"
                    @click="
                      handleSecondCategoryClickEvent(subCategory.id, index)
                    "
                    href="#"
                  >
                    {{ subCategory.title }}
                  </a>
                </li>
              </ul>
            </dd>
          </dl>
          <div class="clear"></div>
        </section>
        <div class="js-wrap">
          <section class="fr">
            <span class="c-ccc">
              <i class="c-master f-fM">1</i>/
              <i class="c-666 f-fM">1</i>
            </span>
          </section>
          <section class="fl">
            <ol class="js-tap clearfix">
              <li
                v-for="item in sortOptions"
                :key="item.value"
                :class="{
                  sortFieldActive: courseQuery.sortField === item.value,
                }"
              >
                <a
                  :title="item.title"
                  href="#"
                  @click="
                    courseQuery.sortField = item.value;
                    getCourseListOfPageCondition();
                  "
                >
                  {{ item.title }}
                  <span v-show="courseQuery.sortField === item.value">↓</span>
                </a>
              </li>
            </ol>
          </section>
        </div>
        <div class="mt40">
          <!-- /无数据提示 开始-->
          <section class="no-data-wrap" v-if="courseInfo.length === 0">
            <em class="icon30 no-data-ico">&nbsp;</em>
            <span class="c-666 fsize14 ml10 vam"
              >没有相关数据，小编正在努力整理中...</span
            >
          </section>
          <!-- /无数据提示 结束-->
          <article class="comm-course-list">
            <ul class="of" id="bna">
              <li v-for="course in courseInfo" :key="course.id">
                <div class="cc-l-wrap">
                  <section class="course-img">
                    <img width="270" height="150" :src="course.cover" alt />
                    <div class="cc-mask">
                      <router-link
                        :to="`/course/` + course.id"
                        title="开始学习"
                        class="comm-btn c-btn-1"
                        >开始学习</router-link
                      >
                    </div>
                  </section>
                  <h3 class="hLh30 txtOf mt10">
                    <router-link
                      :to="`/course/` + course.id"
                      :title="course.title"
                      class="course-title fsize18 c-333"
                    >
                      {{ course.title }}
                    </router-link>
                  </h3>
                  <section class="mt10 hLh20 of">
                    <span class="fr jgTag bg-green">
                      <i class="c-fff fsize12 f-fA">
                        {{ course.price === 0 ? "免费" : course.price + "元" }}
                      </i>
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
        </div>

        <!-- 分页 开始 -->
        <div>
          <el-pagination
            background
            :current-page="page"
            :page-size="limit"
            :total="total"
            style="padding: 30px 0; text-align: center"
            layout="total, prev, pager, next, jumper"
            @current-change="getCourseListOfPageCondition"
          >
          </el-pagination>
        </div>
        <!-- 分页 结束 -->
      </section>
    </section>
    <!-- /课程列表 结束 -->
  </div>
</template>
<script>
import courseApi from "@/api/course";
import categoryApi from "@/api/category";

const courseQuery = {
  categoryFirstId: "",
  categorySecondId: "",
  sortField: "default",
  title: "",
};

export default {
  data() {
    return {
      // 课程列表信息
      courseInfo: {},
      // 课程分类列表（包含子分类列表）
      categoryList: [
        {
          id: "",
          children: [],
        },
      ],
      // 查询时二级分类的索引位置
      secondCategoryIndex: 0,
      courseQuery: { ...courseQuery },
      // 一级分类active索引
      firstCategoryActiveIndex: -1,
      // 二级分类active索引
      secondCategoryActiveIndex: -1,
      // 排序选项
      sortOptions: [
        {
          title: "默认",
          value: "default",
        },
        {
          title: "销量",
          value: "buy_count",
        },
        {
          title: "最新",
          value: "create_time",
        },
        {
          title: "价格",
          value: "price",
        },
      ],
      /**
       * 分页参数
       */
      page: 1,
      limit: 8,
      total: 0,
    };
  },
  created() {
    this.courseQuery.title = this.$route.query.title;
    this.getCourseListOfPageCondition();
    this.getCategoryList();
  },
  methods: {
    // 展示全部课程
    reset() {
      this.firstCategoryActiveIndex = -1;
      this.secondCategoryActiveIndex = -1;
      this.courseQuery = { ...courseQuery };
      this.getCourseListOfPageCondition(1);
    },
    // 查询分页后的课程信息
    getCourseListOfPageCondition(page = 1) {
      let { limit, courseQuery } = this;

      courseApi
        .getCourseListOfPageCondition(page, limit, courseQuery)
        .then((result) => {
          this.total = result.total;
          this.courseInfo = result.data;
        });
    },
    // 查询所有分类
    getCategoryList() {
      categoryApi.getAllCategoryList().then((result) => {
        this.categoryList = result.data;
      });
    },
    // 一级分类click事件
    handleFirstCategoryClickEvent(index) {
      this.firstCategoryActiveIndex = index;
      this.secondCategoryActiveIndex = -1;
      this.secondCategoryIndex = index;
      this.courseQuery.categoryFirstId = this.categoryList[index].id;
      this.courseQuery.categorySecondId = "";
      this.getCourseListOfPageCondition();
    },
    // 二级分类click事件
    handleSecondCategoryClickEvent(categorySecondId, index) {
      this.secondCategoryActiveIndex = index;
      this.courseQuery.categorySecondId = categorySecondId;
      this.getCourseListOfPageCondition();
    },
  },
};
</script>

<style scoped>
.condition li a:hover {
  text-decoration: none;
}

.active {
  background: #68cb9b;
  color: white;
}

.active:hover {
  color: white;
}

.sortFieldActive {
  background-color: #68cb9b;
}

.sortFieldActive a {
  color: white;
}
</style>
